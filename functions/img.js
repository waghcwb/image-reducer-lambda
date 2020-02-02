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

    const [ width, quality = 40, base64 ] = event.path.split('/').slice(4)
    const base64Buffer = Buffer.from(base64, 'base64')
    const height = Jimp.AUTO
    const url = base64Buffer.toString('ascii')
    const image = await Jimp.read({ url })
    await image.quality(Number(quality))
    await image.resize(Number(width), height)
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG)

    // if (image._exif.imageSize.width > width) {
    //     await image.resize(Number(width), height)
    // }

    callback(null, {
        body: buffer.toString('base64'),
        isBase64Encoded: true,
        statusCode: 200,
        headers: {
            'content-type': Jimp.MIME_PNG,
            'content-length': buffer.length
        }
    })
}
