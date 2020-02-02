const debug = require('debug')('imagereducer:app')
const Jimp = require('jimp')

exports.handler = async (event, context, callback) => {
    const allowedMethods = ['GET']

    if (!allowedMethods.includes(event.httpMethod)) {
        return {
            statusCode: 405,
            body: 'go away!'
        }
    }

    const [ width, base64 ] = event.path.split('/').slice(4)
    const base64Buffer = Buffer.from(base64, 'base64')
    const height = Jimp.AUTO
    const url = base64Buffer.toString('ascii')
    const image = await Jimp.read({ url })
    await image.resize(Number(width), height)
    await image.quality(40)

    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) {
            throw err
        }

        callback(null, {
            body: buffer.toString('base64'),
            isBase64Encoded: true,
            statusCode: 200,
            headers: {
                'content-type': Jimp.MIME_PNG,
                'content-length': buffer.length
            }
        })
    })
}