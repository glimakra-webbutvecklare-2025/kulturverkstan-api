// Skapa ett JSON API som lyssnar på port 3000
// den ska svara "Hej från JSON API" oavsett endpoint

import { createServer } from "node:http";

function requestHandler(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end("Hej från JSON API");
}

const server = createServer(requestHandler);

server.listen(3000, () => console.log("Startar på port 3000"));