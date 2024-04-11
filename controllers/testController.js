// controllers/testController.js

import { logTracesInMemory } from "../restsensev2/telemetry.js";

export function getTest(req, res) {
    console.log('Hello World from service /test'+ logTracesInMemory());
    res.send('Hello World from service /test');
}