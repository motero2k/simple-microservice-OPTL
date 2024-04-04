// index.js

const express = require('express');
const app = express();
// Importa las rutas
const testRoutes = require('./routes/testRoutes');
const test2Routes = require('./routes/test2Routes');



// Monta las rutas en la aplicación
app.use('/test', testRoutes);
app.use('/test2', test2Routes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
