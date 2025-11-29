
const express = require("express");
const app = express();

// CORS para permitir que FreeCodeCamp haga las pruebas
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para servir el HTML principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// API endpoint para timestamps
app.get("/api/:date?", (req, res) => {
    const dateParam = req.params.date;
    let date;

    if (!dateParam) {
        // Si no hay parámetro, usar la fecha actual
        date = new Date();
    } else if (/^\d+$/.test(dateParam)) {
        // Si es un número (timestamp en ms)
        date = new Date(parseInt(dateParam));
    } else {
        // Si es string (fecha en formato ISO)
        date = new Date(dateParam);
    }

    // Validar fecha
    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Respuesta JSON exacta
    res.json({
        unix: date.getTime(),       // número en milisegundos
        utc: date.toUTCString()     // string en formato Thu, 01 Jan 1970 00:00:00 GMT
    });
});

// Importante: usar process.env.PORT para Render
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Node.js listening on port " + listener.address().port);
});