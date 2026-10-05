const workshops = [
    {id: 1, title: "Keramik för nybörjare"},
    {id: 2, title: "Virke för nybörjare"},
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

