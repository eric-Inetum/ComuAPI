const app = require('./app/app');

const port = process.env.PORT || 15333;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});