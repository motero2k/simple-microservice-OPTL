// index.js
import { inMemoryExporter as InMemoryExporter } from './restsensev2/telemetry.js';

import express from 'express';
const app = express();
import testRoutes from './routes/testRoutes.js';
import test2Routes from './routes/test2Routes.js';

// Monta las rutas en la aplicación
app.use('/test', testRoutes);
app.use('/test2', test2Routes);
app.get('/startTelemetry', (req, res) => {
    InMemoryExporter.start();
    res.send('Telemetry started');
});
app.get('/stopTelemetry', (req, res) => {
    InMemoryExporter.stop();
    res.send('Telemetry stopped');
});

function removeCircular(obj) {
    const seen = new WeakMap(); // Used to keep track of visited objects

    // Replacer function to handle circular references
    function replacer(key, value) {
        if (typeof value === "object" && value !== null) {
            // If the object has been visited before, return the name prefixed with "CIRCULAR+"
            if (seen.has(value)) {
                const objName = seen.get(value);
                return `CIRCULAR+${objName}`;
            }
            seen.set(value, key); // Mark the object as visited with its name
        }
        return value;
    }

    // Convert the object to a string and then parse it back
    // This will trigger the replacer function to handle circular references
    const jsonString = JSON.stringify(obj, replacer);
    return JSON.parse(jsonString);
}
app.get('/Telemetry', (req, res) => {
    const spans = InMemoryExporter.getFinishedSpans();
    const cleanSpans = spans.map(obj => removeCircular(obj));
    res.send({ spansCount : cleanSpans.length ,spans: cleanSpans });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});