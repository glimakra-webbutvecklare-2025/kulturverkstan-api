import { Router } from "express";
import { getAllWorkshops, getOneWorkshop, createWorkshop, updateOneWorkshop, deleteOneWorkshop } from "../controllers/workshop.js";

// ett samlingobjekt för routes
const router = Router();

// hämta alla workshops
router.get('/', getAllWorkshops);

// hämta EN workshops givet id
router.get('/:id', getOneWorkshop)

// skapa en workshop
router.post('/', createWorkshop)

// uppdatera en workshop givet id och body
router.put('/:id', updateOneWorkshop)

// delete en workshop givet id
router.delete('/:id', deleteOneWorkshop);

export default router;