import { Router } from "express";
// import { getHealthStatus }
const router = Router();

// flytta request handlern till en healthController
// namnge handlerfunktion till getHealthStatus
// så att route.get('/', getHealthStatus) fungerar.

router.get('/', (req, res) => {
    res.status(200).json({ message: "ok" });
})


export default router;