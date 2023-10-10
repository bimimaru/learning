const cors = require('cors');
const express = require('express');
const swagger = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Thinh Le",
        url: "https://www.thinhlh.com",
        email: "thinhlh0812@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["*.js"],
});

const { router } = require('./routers/v1/mock.routers');
const { handleErrors } = require('./middlewares/error-handler.middleware');

const app = express();

app.use('/docs', swagger.serve, swagger.setup(swaggerSpec, {
  explorer: true
}));

// Parse body to json
app.use(express.json());

// Cross origins enabled
app.use(cors());

app.use('/api/v1/books', router);

// Error handler
app.use(handleErrors);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started running on port ${process.env.PORT || 3000}`);
});
