import app from "./express-app.js";
import 'dotenv/config'; // läs .env fil och lägg in i process.env

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
