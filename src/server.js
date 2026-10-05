import { createServer } from "node:http";


import dayjs from "dayjs";
import workshops, { getWorkshopById } from "./workshops.js";

console.log(`kulturverkstan API starting ${dayjs().format("YYYY-MM-DD HH:mm")}`);
console.log(workshops)
console.log("get id 1", getWorkshopById(1));
console.log("get id 99", getWorkshopById(99));

// hjälpfunktion för att undvika repetition när vi skickar json
function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, {'Content-Type': 'application/json; charset=utf-8'});
    response.end( JSON.stringify(data) );
} 


function requestHandler(request, response) {
    if (request.url === '/api/health') {
        sendJson(response, 200, { message: "ok" })
    } else if (request.url === '/api/workshops') {
        sendJson(response, 200, { data: workshops})
    } else {
        sendJson(response, 404, { error: "not found"})
    }
}


const server = createServer( requestHandler );

server.listen(3000, () => console.log('APIet körs på http://localhost:3000'))