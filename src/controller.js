const http = require('http');

// @desc calculate investment returns with and without fees
// @route POST /api/investment-returns
const calculateInvestmentReturns = (req, res, headers) => {
	// get x-www-form-urlencoded form data found in body and concated data chunks into variable

	let body = '';
	req.on('data', (chunk) => {
		body += chunk.toString();
	});

	req.on('end', () => {
		// CALCULATION
		// compount interest formula from https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php
		const investmentFeesResult = {};

		let { currentAmount: p, annualContribution: pmt, retirementAge, currentAge, annualReturn, mer } = JSON.parse(body);
		let t = parseInt(retirementAge, 10) - parseInt(currentAge, 10);
		// using number because don't know if will get while number or decimal from user input
		let r = Number(annualReturn) / 100;
		let m = Number(mer) / 100;

		let cifpGross = parseInt(p, 10) * (1 + r / 1) ** (1 * t);
		let fvsGross = (parseInt(pmt, 10) * ((1 + r / 1) ** (1 * t) - 1)) / (r / 1);
		investmentFeesResult.totalWithoutFees = cifpGross + fvsGross;

		let cifpWithFees = parseInt(p, 10) * (1 + (r - m) / 1) ** (1 * t);
		let fvsWithFees = (parseInt(pmt, 10) * ((1 + (r - m) / 1) ** (1 * t) - 1)) / ((r - m) / 1);
		investmentFeesResult.totalWithFees = cifpWithFees + fvsWithFees;

		// RESPONSE
		res.writeHead(200, headers);
		res.end(JSON.stringify(investmentFeesResult));
	});
};

module.exports = {
	calculateInvestmentReturns,
};
