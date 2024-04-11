

// tracing.js

'use strict'

import process from 'process';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { InMemoryExporter } from './InMemoryExporter.js';

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new ConsoleSpanExporter();
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
  traceExporter,
  instrumentations: [new HttpInstrumentation()]
});

// initialize the SDK and register with the OpenTelemetry API
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

// Create an in-memory span exporter
export const inMemoryExporter = new InMemoryExporter();
// Create a tracer provider
const tracerProvider = new NodeTracerProvider();

// Add the in-memory exporter to the tracer provider
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));

// Register the tracer provider
tracerProvider.register();


// Function to log traces in memory
export function logTracesInMemory() {
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