// console.log(process.argv);

// Uppg. 4
// Skapa en skript som tar emot ett argument - namn
// och sedan skriver ut "hej, {namn}"
const name = process.argv[2];

if (!name) {
    console.error("Ange ett namn. T.ex node src/arg.js Anna");
    process.exit();
}
 
console.log(`Hej, ${name}`);