import { ExportResultCode } from '@opentelemetry/core';


export class InMemoryExporter {
    constructor() {
        this._spans = [];
        this._stopped = false;
    }
    export(spans, resultCallback) {
        try {
            if (!this._stopped){
                this._spans.push(...spans);
            }
            setTimeout(() => resultCallback({ code: ExportResultCode.SUCCESS }), 0);
        } catch (error) {
            return resultCallback({
                code: ExportResultCode.FAILED,
                error: new Error('Error exporting spans\n' + error.message + '\n' + error.stack),
            })
        }
    }
    start() {
        this._stopped = false;
    }
    stop() {
        this._stopped = true;
    }
    shutdown() {
        this._stopped = true;
        this._spans = [];
        return this.forceFlush();
    }
    /**
     * Exports any pending spans in the exporter
     */
    forceFlush() {
        return Promise.resolve();
    }
    reset() {
        this._spans = [];
    }
    getFinishedSpans() {
        return this._spans;
    }
}