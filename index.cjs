// index.js
//TELEMETRY, allays at the top of the file
// import oasTelemetry from './oas-telemetry/index.js';
const oasTelemetry = await import('./oas-telemetry/index.js')

//Rest of the code
// import express from 'express';
const express = require('express');
const app = express();
app.use(express.json());





app.use(oasTelemetry.oasTelemetry());



const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    let text = `
    <h1>Simple express app</h1>
    <h2>Available routes:</h2>
    <ul>
    <li><a href="/test">/test</a></li>
    <li><a href="/test2">/test2</a></li>
    <li><a href="/telemetry">/telemetry</a></li>
    </ul>
    `;
    res.send(text);
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});