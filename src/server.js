const http = require('http');
const { calculateInvestmentReturns } = require('./controller.js');

const server = http.createServer((req, res) => {
	if (req.method === 'POST' && req.url === '/api/investment-returns') {
		calculateInvestmentReturns(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'route not found' }));
	}
});

const PORT = process.env.port || 5000;

server.listen(PORT, () => {
	console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
