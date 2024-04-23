// index.js
//TELEMETRY, allays at the top of the file
import { inMemoryExporter } from './restsensev2/telemetry.js';


//Rest of the code
import express from 'express';
const app = express();
app.use(express.json());
import testRoutes from './routes/testRoutes.js';
import test2Routes from './routes/test2Routes.js';

// Monta las rutas en la aplicación
app.use('/test', testRoutes);
app.use('/test2', test2Routes);

import newTelemetryMiddelware from './restsensev2/telemetryMiddelware.js';

const telemetryConfig = {
    exporter: inMemoryExporter,
    baseURL: '/telemetry',
};

app.use(newTelemetryMiddelware(telemetryConfig));




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


import { startClock, stopClock } from './restsensev2/auxTelemetry.js';
let clockId;

app.get('/startClock', (req, res) => {
    clockId = startClock();
    res.send('Clock started: ' + clockId);
});

app.get('/stopClock', (req, res) => {
    const clockId = req.query.clockId;
    stopClock(clockId);
    res.send(`Clock ${clockId} stopped`);
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});