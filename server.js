const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../web/public"));

let trips = [];
let initialKM = null;

// Alle Fahrten abrufen
app.get("/api/trips", (req, res) => res.json(trips));

// Initialen KM-Stand setzen
app.post("/api/set-km", (req,res)=>{
    initialKM = req.body.km;
    res.json({ok:true, km: initialKM});
});

// Neue Fahrt speichern
app.post("/api/gps-trip", (req,res)=>{
    const { positions, distance_km, trip_type } = req.body;
    const trip = {
        id: uuidv4(),
        start_time: new Date(positions[0].time).toISOString(),
        end_time: new Date(positions[positions.length-1].time).toISOString(),
        distance_km,
        trip_type,
        gps: positions
    };
    trips.push(trip);
    res.json({ok:true, trip});
});

app.listen(3000,()=>console.log("Server läuft auf http://localhost:3000"));
