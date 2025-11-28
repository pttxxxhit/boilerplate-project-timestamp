const express = require("express");
const app = express();

// Ruta raíz para probar que el servidor funciona
app.get("/", (req, res) => {
    res.send("Timestamp Microservice 🚀");
});

// Ruta principal del microservicio
app.get("/api/:date?", (req, res) => {
    let dateParam = req.params.date;
    let date;

    // Si no hay parámetro, usar la fecha actual
    if (!dateParam) {
        date = new Date();
    } else {
        // Si es número (timestamp en ms)
        if (!isNaN(dateParam)) {
            date = new Date(parseInt(dateParam));
        } else {
            // Si es string (fecha en formato ISO)
            date = new Date(dateParam);
        }
    }

    // Validar fecha
    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Respuesta JSON
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Levantar servidor
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Node.js listening on port " + listener.address().port);
});