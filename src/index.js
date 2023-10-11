const app = require('./app/app');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");

const port = process.env.API_PORT;
V1SwaggerDocs(app);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
