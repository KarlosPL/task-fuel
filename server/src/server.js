const express = require('express');
const app = express();
const { port } = require('./config');

// routes
const apiRouter = require('./routes/api');

app.use('/', apiRouter);

// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!');
// });

// app.get('*', (req, res) => {
//     res.status(404).send('<h2>Resource not found!</h2>');
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});