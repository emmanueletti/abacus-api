const http = require('http');
const { calculateInvestmentReturns } = require('./controller.js');

const server = http.createServer((req, res) => {
	// https://bigcodenerd.org/enable-cors-node-js-without-express/
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, POST',
		'Access-Control-Max-Age': 2592000, // 30 days in seconds
		/** add other headers as per requirement */
		'Content-Type': 'application/json',
	};

	if (req.method === 'OPTIONS') {
		// console.log('recieved a pre-flight request');
		res.writeHead(204, headers);
		res.end(JSON.stringify({ message: 'recieved pre-flight request' }));
	} else if (req.method === 'POST' && req.url === '/api/investment-returns') {
		// console.log('recieved a good request');
		calculateInvestmentReturns(req, res, headers);
	} else {
		// console.log('recieved a bad request');
		res.writeHead(404, headers);
		res.end(JSON.stringify({ message: 'route not found' }));
	}
});

const PORT = process.env.port || 5000;

server.listen(PORT, () => {
	// console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
