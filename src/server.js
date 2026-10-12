import { createServer } from "node:http";
import { withLogger } from "./logger.js";
import { requestHandler } from "./app.js";

import dotenv from "dotenv";

// läser miljövariabler och lägger dem i process.env
dotenv.config();
const server = createServer( withLogger(requestHandler) );

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`APIet körs på http://localhost:${PORT}`))