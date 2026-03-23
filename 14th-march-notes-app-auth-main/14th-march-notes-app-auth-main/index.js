const express = require('express');
const path = require('path');


const app = express();

app.use(express.json());

const notes = [];


app.post("/notes", (req, res) => {
    const note = req.body.note;
    notes.push(note);
    res.json({
        message: "Done"
    });
});


app.get("/notes", (req, res) => {
    res.json(notes)
});



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});



app.listen(3000)