const consola = require('consola')

exports.handler = (event, context, callback) => {
    const allowedMethods = ['GET']

    consola.log(event)
    console.log('test log')

    if (!allowedMethods.includes(event.httpMethod)) {
        return {
            statusCode: 405,
            body: 'go away!'
        }
    }

    const { width, base64 } = event.path.split('/').slice(4)

    callback(null, {
        statusCode: 200,
        body: 'No worries, all is working fine!\n' + `width: ${width}\n base64: ${base64}`
    })
}