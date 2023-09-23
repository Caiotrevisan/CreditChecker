export const handler = async (event) => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    let body = ""
    const { method, path } = event.requestContext.http;
    const [route, param, user_id] = path.slice(1).split('/')
    if (method === "POST" || method === "PATCH") {
        body = JSON.parse(event.body);
    }

    let res = ""
    switch (route) {
        case "user":
            switch (method) {
                case "POST":
                    switch (param) {
                        case 'login':
                            res = await authLogin(req, res)
                            break;
                    }

                    break;
            }
            break;
    }

    // Response
    if (res.error) {
        return {
            statusCode: res.statusCode,
            body: JSON.stringify({
                message: res.message,
                error: res.error
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, UPDATE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
        }
    }
    return {
        statusCode: res.statusCode,
        body: JSON.stringify({
            message: res.message,
            body: res.body
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, UPDATE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
    };

}

