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
app.get('/startTelemetry', (req, res) => {
    inMemoryExporter.start();
    res.send('Telemetry started');
});
app.get('/stopTelemetry', (req, res) => {
    inMemoryExporter.stop();
    res.send('Telemetry stopped');
});
app.get('/resetTelemetry', (req, res) => {
    inMemoryExporter.reset();
    res.send('Telemetry reset');
});



const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    let text = `
    <h1>Dynamic Restsense showcase</h1>
    <h2>Available routes:</h2>
    <ul>
        <li><a href="/test">/test</a></li>
        <li><a href="/test2">/test2</a></li>
        <li><a href="/startTelemetry">/startTelemetry</a></li>
        <li><a href="/stopTelemetry">/stopTelemetry</a></li>
        <li><a href="/Telemetry">/Telemetry</a></li>`
    res.send(text);
});


app.get('/Telemetry', (req, res) => {
    inMemoryExporter.forceFlush();
    const spansDB = inMemoryExporter.getFinishedSpans();
    spansDB.find({},(err, docs) => {
        if (err) {
            console.error(err);
            return;
        }
        const spans = docs;
        res.send({ spansCount: spans.length, spans: spans });
    });
    // res.send(spans);
});
app.post('/TelemetrySearch', (req, res) => {
    const spansDB = inMemoryExporter.getFinishedSpans();
    const search = req.body;
    console.log(search);
    console.log(typeof search);
    spansDB.find(search,(err, docs) => {
        if (err) {
            console.error(err);
            res.send({ spansCount: "error", spans: [] });
            return;
        }
        const spans = docs;
        res.send({ spansCount: spans.length, spans: spans });
    });

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