const workshops = [
    {id: 1, title: "Keramik för nybörjare", category: "keramik"},
    {id: 2, title: "Keramik fortsättning", category: "keramik" },
    {id: 3, title: "Keramik för veteraner", category: "keramik"},
    {id: 4, title: "Virke för nybörjare", category: "virke"},
    {id: 5, title: "Virke fortsättning", category: "virke"},
    {id: 6, title: "Virke för veteraner", category: "virke"},
]

export const location = "Glimåkra";

export function getWorkshopById(id) {
    const foundWorkshop = workshops.find( workshop => workshop.id === id);

    if (foundWorkshop) {
        return foundWorkshop;
    } else {
        return null;
    }
} 

export default workshops;

