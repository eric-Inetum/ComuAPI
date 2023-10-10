const app = require('./app/app');
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");
const port = process.env.PORT || 15333;
V1SwaggerDocs(app, port);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});