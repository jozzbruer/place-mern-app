import http from 'http';
import app from './app.js';

const normalizePort = (val) => {
	const port = parseInt(val, 10);
	if (isNaN(port)) return val;
	if (port >= 0) return port;
	return false;
};

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const errorHandler = (error) => {
	if (error.syscall !== 'listen') throw error;

	const adress = server.address();
	const bind = typeof adress === 'string' ? 'pipe ' + adress : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.log(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.log(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const server = http.createServer(app);

server
	.on('error', errorHandler)
	.on('listening', () => {
		const address = server.address();
		const bind = typeof adress === 'string' ? 'pipe ' + adress : 'port: ' + port;
		console.log('Listening on ' + bind);
	})
	.listen(port);
