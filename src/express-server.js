import 'dotenv/config';
import app from './express-app.js';
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`API: http://localhost:${port}`));