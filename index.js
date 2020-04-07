const express = require('express');

const postsRouter = require('./data/router.js');

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get('/', (req, res) => {
    res.json({api: 'running.....'});
});



server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});