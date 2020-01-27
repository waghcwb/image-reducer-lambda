exports.handler = (event, context, callback) => {
    const allowedMethods = ['GET']

    console.log('test log')
    console.warn('test log')

    if (!allowedMethods.includes(event.httpMethod)) {
        return {
            statusCode: 405,
            body: 'go away!'
        }
    }

    const [ width, base64 ] = event.path.split('/').slice(4)
    const base64Buffer = new Buffer(base64, 'base64')

    callback(null, {
        statusCode: 200,
        body: 'No worries, all is working fine!\n' + `width: ${width}\n base64: ${base64}` + `\nbase64Buffer: ${base64Buffer}`
    })
}