const app = require('./app');
const { createServer } = require('http');
const { PORT } = require('./utils/config');
const { info } = require('./utils/logger');

const server = createServer(app);

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
