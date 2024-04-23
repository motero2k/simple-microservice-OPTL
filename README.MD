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
import { inMemoryExporter } from './restsensev2/telemetry.js';

```

Endpoints are accessible because there is a telemetry middleware configured:
```js
import newTelemetryMiddelware from './restsensev2/telemetryMiddelware.js';

const telemetryConfig = {
    exporter: inMemoryExporter,
    baseURL: '/telemetry',
};

app.use(newTelemetryMiddelware(telemetryConfig));
```

- To get traces make a GET to `/telemetry/list`
- To stop the telemetry make a GET to `/telemetry/stop`
- To start the telemetry again make a GET to `/telemetry/start`

Also you can find traces making a post to `/telemetry/find` and having the filter in the body using [nedb query format](https://github.com/louischatriot/nedb?tab=readme-ov-file#basic-querying). Exapmple:
```
{
    "attributes.http_dot_url":"http://localhost:3000/test2"
}
```

>Note: dots are not supported inside a nedb field. All dots in names are replaced by \_dot\_. Future versions may resolve this by creating subobjects.



