const express = require("express");
const server = express();
const port = 3000;


server.get('/', (req, res) => {
    res.send('entry point')
});

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})