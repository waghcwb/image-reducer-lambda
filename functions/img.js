const debug = require('debug')('imagereducer:app')
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
    const base64Buffer = new Buffer(base64, 'base64')
    const img = base64Buffer.toString('ascii')

    const { body, statusCode } = await request(img)

    callback(null, {
        statusCode: statusCode,
        headers: {
            'content-type': 'image/png',
            'Content-Length': body.length
        },
        body: Buffer.from(body)
    })
}