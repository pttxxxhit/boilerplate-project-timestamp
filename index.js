const express = require("express");
const app = express();

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
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Importante: usar process.env.PORT para Render
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Node.js listening on port " + listener.address().port);
});