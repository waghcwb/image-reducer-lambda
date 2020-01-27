const debug = require('debug')('imagereducer:app')
const sharp = require('sharp')
const _request = require('request').defaults({ encoding: null })
const { promisify } = require('util')

const request = promisify(_request)

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
    const img = base64Buffer.toString('ascii')

    const { body } = await request(img)

    // const resize = await sharp(body)
    //   .resize({
    //     width: Number(width),
    //     fit: 'inside'
    //   })
    //   .png()
    //   .toBuffer()

    callback(null, {
        body: body.toString('base64'),
        isBase64Encoded: true,
        statusCode: 200,
        headers: {
            'content-type': 'image/png',
            'content-length': body.length
        }
    })
}