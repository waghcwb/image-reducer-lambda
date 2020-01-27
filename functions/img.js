const consola = require('consola')

exports.handler = (event, context, callback) => {
    const allowedMethods = ['GET']

    consola.log(event)

    if (allowedMethods.includes(event.httpMethod)) {
        return {
            statusCode: 405,
            body: 'go away!'
        }
    }

    callback(null, {
        statusCode: 200,
        body: 'No worries, all is working fine!'
    })
}