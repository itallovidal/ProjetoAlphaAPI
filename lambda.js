const awsLambdaFastify = require('aws-lambda-fastify')
const init = require('./server');

const proxy = awsLambdaFastify(init())
exports.handler = proxy;
