// Skapa en express server som lyssnar på port 3000
// vid anrop till localhost:3000/hello ska man få ett json svar { message: "Hello"}

// 1. importera express från express-biblioteket
import express from "express";

// 2. skapa en instans av express till en variabel som kan kallas 'app'
const app = express();

// kunna ta emot json i body
app.use(express.json());

// 3. registrera en route /hello som svara med json { message: "hello"}
app.get('/hello', (req, res) => { 
    res.json({ message: "Hello"})
 });

// 5. skapa en till route med metoden POST route "/submit" som ska vara med { message: "You have submitted!" }
// 5.1 gör det möjligt att ta emot information från requsten i json format. Svara med { message: "You have submitted", data: req.body }
// curl -X localhost:3000/submit -H "Content-Type: application/json" -d '{"data": "this is my data"}'
// { message: "You have submitted!", data: ... }
app.post('/submit', (req, res) => {
    res.json({ message: "You have submitted!", data: req.body});
});

// 4. få 'app' att lyssna på port 3000
app.listen(3000, () => console.log("Listening..."))