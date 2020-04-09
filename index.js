require('dotenv').config();

const express = require('express');
const cors = require('cors');

const postsRouter = require('./data/router.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter);

server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from localhost";
  res.json({api: 'running.....', message});
});


const port = process.env.PORT;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});