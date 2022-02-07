const options = {
    swaggerDefinition: {
        info: {
            description: 'API for FCM android app',
            title: 'FCM API',
            version: '1.0.0',
        },
        host:'fcmapiesmapp.herokuapp.com',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['https'],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer Token",
            }
        }
        

    },
    basedir: __dirname,
    files: ['./routes//*.js', './models//*.js']
};

module.exports = options;