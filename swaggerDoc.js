//  @author: Abhishek S
//  Filename: swaggerDoc.js
//  This is swaggerDoc.js. 
//  This file contains all configurations for the Swagger-UI documentation for the API

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const express = require('express');
const options = {
    swaggerDefinition: {
        info: {
            title: "ITIS 6177 | MIDTERM-STUDENT-APP-API",
            version: "2.0",
            description: "This is student's app and API",
            servers: ["http://localhost:3000"]
        },
        basePath: "/api/v1",

    },
    apis: ['./routes/studentController.js', './routes/subjectController.js'],
};

const specs = swaggerJsdoc(options);
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use('/api/v1', express.static(path.join(__dirname, 'routes')));
    app.use(function (err, req, res, next) {
        if (err.isBoom) {
            return res.status(err.output.statusCode).json(err.output.payload);
        }
    });
};