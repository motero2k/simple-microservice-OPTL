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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});