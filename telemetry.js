

// tracing.js

'use strict'

const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new ConsoleSpanExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
  traceExporter,
  instrumentations: [new HttpInstrumentation()]
});

// initialize the SDK and register with the OpenTelemetry API
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { InMemorySpanExporter } = require('@opentelemetry/sdk-trace-base');

// Create an in-memory span exporter
const inMemoryExporter = new InMemorySpanExporter();

// Create a tracer provider
const tracerProvider = new NodeTracerProvider();

// Add the in-memory exporter to the tracer provider
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));

// Register the tracer provider
tracerProvider.register();

// Retrieve the current tracer
const tracer = tracerProvider.getTracer('example-tracer-js');

// Function to log traces in memory
function logTracesInMemory() {
    // count spans in memory
    const spanCount = inMemoryExporter.getFinishedSpans().length;
    return `Span count: ${spanCount}`;
}

function flushTraces() {
    // flush spans in memory
    inMemoryExporter.export(inMemoryExporter.getFinishedSpans(), () => {
        console.log('Spans flushed');
    });
}


// Export functions for external usage
module.exports = {

    logTracesInMemory
};
