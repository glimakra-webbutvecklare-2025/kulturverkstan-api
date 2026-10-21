import express from "express";
import swaggerUi from "swagger-ui-express";
import logger from "./express-logger.js";
import workshops, {allocateNextId} from "./workshops.js";
import { readFile } from 'node:fs/promises';
import workshopRouter from "./routes/workshop.js"
import healthRouter from "./routes/health.js"
const app = express();


const spec = JSON.parse(await readFile(
  new URL('../openapi.json', import.meta.url), 'utf8'
));

app.get('/', (req, res) => {
  return res.redirect(302, '/docs');
});

app.get('/openapi.json', (req, res) => {
  return res.json(spec);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

// middlare, möjligör att loggning efter response
app.use(logger);

// middlare, möjligör att JSON kan tolkas och samlas i req.body
app.use(express.json());

// Registera route -> handler
app.use('/api/health', healthRouter);

// Använd router för att samla alla routes relaterat till workshops
app.use('/api/workshops', workshopRouter);

// Om ingen route blir träffad. ge 404
app.use((req, res) => {
  return res.status(404).json({ error: 'not found' });
});

export default app;
