# OAS-TOOLS-TELEMETRY-DEMO
This is a demo using @restsense/agent module.

## QuickStart

1. Clone the repository.
2. Install dependencies using:

```bash
npm i
```

3. Start the server using:
```bash
node index.js
```

## Usage

Telemetry is running by default because in the index.js file we have:
```js
import { inMemoryExporter as InMemoryExporter } from './restsensev2/telemetry.js';

```

- To get traces make a GET to `/Telemetry`
- To stop the telemetry make a GET to `/stopTelemetry`
- To start the telemetry again make a GET to `/startTelemetry`


