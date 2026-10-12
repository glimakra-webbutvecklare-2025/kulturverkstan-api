import workshops, { getWorkshopById } from "./workshops.js";


// hjälpfunktion för att undvika repetition när vi skickar json
function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, {'Content-Type': 'application/json; charset=utf-8'});
    response.end( JSON.stringify(data) );

    return;
}

// hjälpmedel för att läsa in request body -> JS objekt
async function readJsonBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
  }

  return body ? JSON.parse(body) : {};
}

export async function requestHandler(request, response) {
    try {
        // dela upp urlen i två delar
        // url och query
        const [url, query] = request.url.split('?');
        const searchParams = new URLSearchParams(query);

        const match = url.match(/^\/api\/workshops\/(.+)$/);

        if (url === '/api/health') {
            sendJson(response, 200, { status: "ok" });
            return;
        } 
        
        // Hämta alla workshops med eller utan filtrering av kategori
        else if (request.method === 'GET' && url === '/api/workshops') {
            // undersöka om query är `category=xxxxx`
            const category = searchParams.get('category');
            if (category) {
                // om sant, ska vi filtrera
                const filteredWorkshops = workshops.filter(
                        workshop => workshop.category === category.toLowerCase()
                    );

                sendJson(response, 200, { data: filteredWorkshops });
                return;
            }

            sendJson(response, 200, { data: workshops})
        }

        // Uppdatera en workshop
        // else if (request.method === 'GET' && match) {
        //     const id = Number(match[1]);

        //     console.log("GET workshop with id", id);

        // }

        // Uppdatera en workshop
        else if (request.method === 'PUT' && match) {
            const id = Number(match[1]);

            // Validera om id har rätt format
            if (!Number.isSafeInteger(id) || id < 1) {
                return sendJson(response, 400, { message: 'invalid id' });
            }

            // hitta workshop (find, eller findIndex)
            const workshopIndex = workshops.findIndex(workshop => workshop.id === id);

            // om ej hittad, meddela (kolla DELETE exempel)
            if (workshopIndex === -1) {
                response.statusCode = 404;
                response.end();
                return;
            }

            // hämta nya värden från request body (readJsonBody)
            const body = await readJsonBody(request);
            const { title, category } = body;

            // validera att nya värden är ok 
            if (!title || !category) {
                sendJson(response, 400, { message: "title and category must be set"});
                return;
            }


            // uppdatera workshop med nya värden
            const updatedWorkshop = workshops[workshopIndex];
            updatedWorkshop.title = title;
            updatedWorkshop.category = category;

            // meddela 200 och uppdaterad workshop
            sendJson(response, 200, {data: updatedWorkshop})
        }

        // Ta bort en workshop
        else if (request.method === 'DELETE' && match) {
            const id = Number(match[1]);
            
            // Validera om id har rätt format
            if (!Number.isSafeInteger(id) || id < 1) {
                return sendJson(response, 400, { message: 'invalid id' });
            }

            // hitta workshop med rätt id
            const workshopIndex = workshops.findIndex(workshop => workshop.id === id);

            // Om inte finns, meddela 404
            if (workshopIndex === -1) {
                response.statusCode = 404;
                response.end();
                return;
            }
            // ta bort workshop från array `workshops` om den finns
            workshops.splice(workshopIndex, 1);

            // meddela att workshop är borttagen
            response.statusCode = 204;
            response.end();
        }

        // Lägga till ny workshop
        else if (request.method === "POST"  && url === '/api/workshops') {

            // 1. förvänta oss data i body
            // Läsa body med readJsonBody
            const body = await readJsonBody(request);

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
    } catch (error) {
    if (error instanceof SyntaxError) {
      return sendJson(response, 400, { message: 'invalid JSON' });
    }
    console.error(error);
    return sendJson(response, 500, { message: 'internal server error' });
  }
}