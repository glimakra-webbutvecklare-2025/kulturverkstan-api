import express from "express";
import { logger } from "./express-logger.js";
import workshops from "./workshops.js";


const app = express();

// använda en middleware i express:
app.use(logger);
// läsa JSON body från en request
app.use(express.json())

app.get('/api/health', (request, response) => {
    response.status(200).json({ status: 'express - ok' });
})

app.get('/api/workshops', (request, response) => {
    const { category } = request.query;

    console.log(typeof category)
    if (category && Number(category)) {
        return response.status(400).json({ message: 'invalid category query' });
    }
    if (category) {
        const filteredWorkshops = workshops.filter(wk => wk.category === category.toLowerCase());
        return response.status(200).json({ data: filteredWorkshops});
    }
    response.status(200).json({ data: workshops });
});

app.post('/api/workshops',  (request, response) => {
    // plocka ut title, category
    const { title, category } = request.body;

    // undersöka att det är rimlig input
    //  om orimlig input, meddela 400
    if (!title || title.length < 3 || !category || category.length < 2) {
        return response.status(400).json({ message: "Bad format of title and category" })
    }

    // skapa ny workshop
    const newWorkshop = { id: workshops.length + 1, title, category }
    workshops.push(newWorkshop);

    // meddela success
    response.status(200).json({data: newWorkshop})
})

// todo
app.put('/api/workshops/:id', (request, response) => {});

app.delete('/api/workshops/:id', (request, response) => {
    const id = Number(request.params.id);

    // Validera om id har rätt format
    if (!Number.isSafeInteger(id) || id < 1) {
        return response.status(400).json({ message: 'invalid id' });
    }

    // hitta workshop med rätt id
    const workshopIndex = workshops.findIndex(workshop => workshop.id === id);

    if (workshopIndex === -1) {
        return response.status(404);
    }

    // ta bort workshop från array `workshops` om den finns
    workshops.splice(workshopIndex, 1);

    // meddela att workshop är borttagen
    return response.status(204).end();
});


export default app;