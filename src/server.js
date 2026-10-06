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

// hjälpmedel för att läsa in request body -> JS objekt
async function readJsonBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
  }
  return JSON.parse(body);
}


async function requestHandler(request, response) {
    // dela upp urlen i två delar
    // url och query
    const [url, query] = request.url.split('?');
    const searchParams = new URLSearchParams(query);
    console.log(`url: ${url}, query: ${query}`, searchParams);

    if (url === '/api/health') {
        sendJson(response, 200, { message: "ok" })
    } 
    
    // Hämta alla workshops med eller utan filtrering av kategori
    else if (request.method === 'GET' && url === '/api/workshops') {
        // undersöka om query är `category=xxxxx`
        const category = searchParams.get('category');
        console.log('User is searching for', category);
        if (category) {
            // om sant, ska vi filtrera
            const filteredWorkshops = workshops.filter(
                    workshop => workshop.category === category.toLowerCase()
                );

            console.log("filtered workshop that server should respond with:", filteredWorkshops);

            sendJson(response, 200, { data: filteredWorkshops });
            return;
        }

        sendJson(response, 200, { data: workshops})
    } 
    
    // Lägga till ny workshop
    else if (request.method === "POST"  && url === '/api/workshops') {

        // 1. förvänta oss data i body
        // Läsa body med readJsonBody
        const body = await readJsonBody(request);

        console.log("Body:", body);

        // 2. med datan spara ett nytt workshop objekt och ge den nytt id
        // förväntar oss title och category från body
        const { title, category } = body;

        if (!title || !category) {
            sendJson(response, 400, {message: "title and category must be set"})
            return;
        }

        // 3. lägg till workshop obj till "databasen" (workshops)
        const newWorkshop = { id: workshops.length + 1, title, category }
        workshops.push(newWorkshop);

        sendJson(response, 201, { data: newWorkshop })
    }
    else {
        sendJson(response, 404, { error: "not found"})
    }
}


const server = createServer( requestHandler );

server.listen(5000, () => console.log('APIet körs på http://localhost:5000'))