// telemetryMiddleware.js
import { Router } from 'express';


//  // Start telemetry
        
//  app.get('/start', (req, res) => {
//     inMemoryExporter.start();
//     res.send('Telemetry started');
// });

// // Stop telemetry
// app.get('/stop', (req, res) => {
//     inMemoryExporter.stop();
//     res.send('Telemetry stopped');
// });

// // Reset telemetry
// app.get('/reset', (req, res) => {
//     inMemoryExporter.reset();
//     res.send('Telemetry reset');
// });
export default newTelemetryMiddelware;
let telemetryConfig ;
export function newTelemetryMiddelware(tlConfig) {
    telemetryConfig = tlConfig;
    const router = Router();
    const baseURL = telemetryConfig.baseURL;
    router.get(baseURL, landingPage);
    router.get(baseURL+"/reset", resetTelemetry);
    router.get(baseURL+"/start", startTelemetry);
    router.get(baseURL+"/stop", stopTelemetry);
    router.get(baseURL+"/list", listTelemetry);
    router.post(baseURL+"/search", searchTelemetry);
    return router;
}
const landingPage = (req, res) => {
    let text = `
    <h1>Telemetry showcase</h1>
    <h2>Available routes:</h2>
    <ul>
        <li><a href="/telemetry/start">/telemetry/start</a></li>
        <li><a href="/telemetry/stop">/telemetry/stop</a></li>
        <li><a href="/telemetry/reset">/telemetry/reset</a></li>
        <li><a href="/telemetry/list">/telemetry/list</a></li>
        <li>/telemetry/search [POST]</li>
    </ul>
    `;
    res.send(text);
}


const startTelemetry = (req, res) => {
    telemetryConfig.exporter.start();
    res.send('Telemetry started');
}
const stopTelemetry = (req, res) => {
    telemetryConfig.exporter.stop();
    res.send('Telemetry stopped');
}
const resetTelemetry = (req, res) => {
    telemetryConfig.exporter.reset();
    res.send('Telemetry reset');
}
const listTelemetry = (req, res) => {
    const spansDB = telemetryConfig.exporter.getFinishedSpans();
    spansDB.find({},(err, docs) => {
        if (err) {
            console.error(err);
            return;
        }
        const spans = docs;
        res.send({ spansCount: spans.length, spans: spans });
    });
}

const searchTelemetry = (req, res) => {
    const spansDB = telemetryConfig.exporter.getFinishedSpans();
    const search = req.body;
    spansDB.find(search,(err, docs) => {
        if (err) {
            console.error(err);
            res.send({ spansCount: "error", spans: [] });
            return;
        }
        const spans = docs;
        res.send({ spansCount: spans.length, spans: spans });
    });
}


