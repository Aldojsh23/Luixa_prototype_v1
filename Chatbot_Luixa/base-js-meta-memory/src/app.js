//import { join } from 'path'
import 'whatwg-fetch'
import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
import { supabase } from './supabase.js'

const PORT = process.env.PORT ?? 3008

//const { supabase } = require('./supabase.js')

const orderFlow = addKeyword(['pedido', 'orden', 'comprar'])
    .addAnswer('🛍️ ¡Perfecto! Escribe tu pedido, puedes ingresar varios productos, un producto por línea. Ejemplo:\n\n2 camisetas talla M\n8 pantalones talla 36\n6 calcetines talla unitalla', 
    { capture: true }, 
    async (ctx, { flowDynamic }) => {
        const message = ctx.body.toLowerCase()
        const lineas = message.split('\n').map(line => line.trim()).filter(line => line.length > 0)

        if (lineas.length === 0) {
            await flowDynamic('❌ No entendí tu mensaje. Por favor escribe cada producto en una línea con el formato: "cantidad producto talla talla_producto".')
            return
        }

        // 🚩 Primero insertamos un nuevo pedido y recuperamos su id
        const { data: pedidoInserted, error: pedidoError } = await supabase
            .from('pedido')
            .insert([{ /* puedes agregar campos extra como id_cliente o fecha */ }])
            .select('id_pedido') // obtener el id_pedido insertado
            .single()

        if (pedidoError) {
            console.error('Error insertando pedido:', pedidoError)
            await flowDynamic('⚠️ Hubo un error al crear tu pedido. Intenta de nuevo más tarde.')
            return
        }

        const id_pedido = pedidoInserted.id_pedido
        console.log(`Nuevo pedido creado con id_pedido=${id_pedido}`)

        // 🚩 Procesar cada línea
        for (const linea of lineas) {
            const match = linea.match(/(\d+)\s+([a-záéíóúñ\s]+)\s+talla\s+(\w+)/i)

            if (!match) {
                await flowDynamic(`⚠️ La línea: "${linea}" no tiene el formato esperado. Debe ser: "cantidad producto talla talla_producto".`)
                continue
            }

            const cantidad = parseInt(match[1])
            const nombre_producto = match[2].trim()
            const talla = match[3].trim()

            console.log(`Procesando línea: cantidad=${cantidad}, producto=${nombre_producto}, talla=${talla}`)

            // Buscar producto
            const { data: productos, error } = await supabase
                .from('producto')
                .select('id_producto, precio_producto')
                .ilike('nombre_producto', `%${nombre_producto}%`)
                .eq('talla_producto', talla)
                .limit(1)

            if (error) {
                console.error('Error buscando producto:', error)
                await flowDynamic(`⚠️ Error al buscar el producto "${nombre_producto}" talla "${talla}".`)
                continue
            }

            if (!productos || productos.length === 0) {
                await flowDynamic(`❌ No encontré el producto "${nombre_producto}" en talla "${talla}".`)
                continue
            }

            const producto = productos[0]
            const precio_unitario = producto.precio_producto
            const subtotal = cantidad * precio_unitario

            // Insertar en detalle_pedido
            const { error: insertError } = await supabase
                .from('detalle_pedido')
                .insert([{
                    id_pedido: id_pedido,
                    id_producto: producto.id_producto,
                    cantidad: cantidad,
                    precio_unitario: precio_unitario,
                    subtotal: subtotal,
                    talla: talla
                }])

            if (insertError) {
                console.error('Error insertando detalle pedido:', insertError)
                await flowDynamic(`⚠️ Hubo un error al guardar el producto "${nombre_producto}" talla "${talla}".`)
                continue
            }

            await flowDynamic(`✅ Producto agregado:\n🛍️ ${nombre_producto}\n📏 Talla: ${talla}\n📦 Cantidad: ${cantidad}\n💲 Precio unitario: $${precio_unitario}\n💰 Subtotal: $${subtotal}`)
        }

        await flowDynamic(`🎉 Tu pedido (id: ${id_pedido}) ha sido registrado con éxito. ¡Gracias por tu compra!`)
    })




// 🚩 Flujo WELCOME
const welcomeFlow = addKeyword(['hi', 'hello', 'hola'])
    .addAnswer(`Holaa, soy Luixa, tu *Chatbot* para los pedidos`)
    .addAnswer(
        [
            'Ingresa tu pedido para que pueda ayudarte a realizarlo',
            'Ingresa la palabra *pedido*',
        ].join('\n')
    )


const main = async () => {
    const adapterFlow = createFlow([welcomeFlow, orderFlow])
    const adapterProvider = createProvider(Provider, {
        jwtToken: 'EAAHgtyyubZAEBOy0pBFIAptS8Uz79hI1Y2J02WZChviIgRVJ0GNTgKc6HpZClLmA7cZBXKlvOzydBeQRhZBo5NtTrWFNCpw3S1qRwy2FABUB7xfvpeDJzh2QqdYFkodhYZC6x1Jykg4QsfTYxN5eGF6vDW4hNf7oqCvCimUsGbJOqiZAO3n6ZBhib2UGhTHHcIKMZCecEVO0N8LA9qVDyxpCpiiKl5ZBi1SJp4LwQZD',
        numberId: '615071368359931',
        verifyToken: 'Luixa_chatbot',
        version: 'v22.0'
    })
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()