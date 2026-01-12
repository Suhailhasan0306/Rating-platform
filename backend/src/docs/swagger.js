const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rating Platform API",
      version: "1.0.0",
      description: "API docs for Rating Platform assignment",
    },
    servers: [{ url: "http://localhost:4000/api" }],
  },
  apis: ["./src/routes/*.js"],  
};

module.exports = swaggerJSDoc(options);

