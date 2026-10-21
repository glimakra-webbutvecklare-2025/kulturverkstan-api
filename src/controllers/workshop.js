import workshops from "../workshops.js";


export function getAllWorkshops(req, res) {
    // filter hantering
    if (req.query.category) {
        const filteredWorkshops = workshops.filter(wk => wk.category === req.query.category.toLowerCase())
        return res.status(200).json({ data: filteredWorkshops });
    }

    res.status(200).json({ data: workshops });
}

export function getOneWorkshop(req, res) {
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
}

export function createWorkshop(req, res) {
    // hämta data från req.body
    const { title, category } = req.body;

    // validera datan
    if (typeof title !== 'string' || !title.trim() ||
        typeof category !== 'string' || !category.trim()) {
        return res.status(400).json({ message: 'title and category required'});
    }
    // skapa ny workshop
    const newWorkshop = {
        id: allocateNextId(),
        title: title.trim(),
        category: category.trim().toLowerCase()
    };
    
    workshops.push(newWorkshop);

    return res.status(201).json({ data: newWorkshop });
}

export function updateOneWorkshop(req, res) {
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

    const workshop = workshops[workshopIndex];

    // validera body
    const { title, category } = req.body ?? {};
    if (typeof title !== 'string' || !title.trim() ||
        typeof category !== 'string' || !category.trim()) {
        return res.status(400).json({
            message: 'title and category required'
        });
    }

    // uppdatera workshop
    workshop.title = title.trim();
    workshop.category = category.trim().toLowerCase();

    res.status(200).json({data: workshop})
}

export function deleteOneWorkshop(req, res) {
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
}