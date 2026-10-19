import express from "express";
import logger from "./express-logger.js";
import workshops from "./workshops.js";
const app = express();

// middlare, möjligör att loggning efter response
app.use(logger);

// middlare, möjligör att JSON kan tolkas och samlas i req.body
app.use(express.json());

// Registera route -> handler
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "ok" });
})

// hämta alla workshops
app.get('/api/workshops', (req, res) => {

    // filter hantering
    if (req.query.category) {
        const filteredWorkshops = workshops.filter(wk => wk.category === req.query.category.toLowerCase())
        return res.status(200).json({ data: filteredWorkshops });
    }

    res.status(200).json({ data: workshops });
})

// hämta EN workshops givet id
app.get('/api/workshops/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ message: 'invalid id' });
    }

    // försök hitta index till workshop
    const workshopIndex = workshops.findIndex(wk => wk.id === id);

    // om ej hittat -> 404
    if (workshopIndex < 0) {
        return res.status(404).end();
    }
    // svara med hittad workshop
    res.status(200).json({data: workshops[workshopIndex]});
})

// skapa en workshop
app.post('/api/workshops', (req, res) => {
    // hämta data från req.body
    const { title, category } = req.body;

    // validera datan
    if (typeof title !== 'string' || !title.trim() ||
        typeof category !== 'string' || !category.trim()) {
        return res.status(400).json({ message: 'title and category required'});
    }
    // skapa ny workshop
    const newWorkshop = {
        id: workshops.length + 1, // Tillfälligt! Rättas i lektion 2.
        title: title.trim(),
        category: category.trim().toLowerCase()
    };
    
    workshops.push(newWorkshop);

    return res.status(201).json({ data: newWorkshop });
})

// delete en workshop givet id
app.delete('/api/workshops/:id', (req, res) => {
    // försök hitta workshop index
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ message: 'invalid id' });
    }

    // försök hitta index till workshop
    const workshopIndex = workshops.findIndex(wk => wk.id === id);

    // om ej hittad -> 404
    if (workshopIndex < 0) {
        return res.status(404).end();
    }

    // ta bort workshop
    workshops.splice(workshopIndex, 1);

    // svara 204
    res.status(204).end();
})

export default app;
