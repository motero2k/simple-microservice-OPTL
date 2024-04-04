// telemetry.js
const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { diag, DiagConsoleLogger, DiagLogLevel } = require( '@opentelemetry/api');

const express = require('express');


const app = express.Router();


diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new ConsoleSpanExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});
let started = false;
true == !false;
// Define endpoint to start telemetry
app.get('/start', (req, res) => {
  // Start the tracing SDK if not already started
  if (!started) {
    sdk.start();
    res.send('Telemetry started');
    console.log('Telemetry started');
    started = true;
  } else {
    res.send('Telemetry is already started');
  }
});

// Define endpoint to stop telemetry
app.get('/stop', (req, res) => {
  // Stop the tracing SDK if it's started
  if (started) {
    sdk.shutdown()
      .then(() => {
        res.send('Telemetry stopped');
        console.log('Telemetry stopped');
        started = false;
      })
      .catch((error) => {
        res.status(500).send('Error stopping telemetry');
        console.error('Error stopping telemetry', error);
      });
  } else {
    res.send('Telemetry is already stopped');
  }
});

// Listen for SIGTERM signal to gracefully shut down the SDK
process.on('SIGTERM', () => {
  if (sdk.isStarted()) {
    sdk.shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  }
});

module.exports = app;
