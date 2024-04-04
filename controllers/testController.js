// controllers/testController.js

const {  logTracesInMemory } = require("../telemetry");

exports.getTest = (req, res) => {
    console.log('Hello World from service /test'+ logTracesInMemory());
    res.send('Hello World from service /test');
};