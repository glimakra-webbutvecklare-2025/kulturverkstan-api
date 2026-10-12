import { test } from "node:test";
import assert from "node:assert/strict";
import { getWorkshopById } from "./workshops.js";


test('Finds a workshop by id', () => {
    const workshop = getWorkshopById(1);
    assert.equal(workshop.title, 'Keramik för nybörjare');
});

// lägg till test som testar om workshop by id 99 ska ge null
// kör sedan `npm test`

test('missing workshop return null', () => {
    const workshop = getWorkshopById(99);
    assert.equal(workshop, null);
});