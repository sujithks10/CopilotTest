import { test, expect } from '@playwright/test';
 
const baseURL = 'https://petstore.swagger.io/v2';
 
test('Add a new pet to the store and updating an existing pet', async ({ request }) => {
    const createResponse = await request.post(`${baseURL}/pet`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            id: 111,
            category: {
                id: 111,
                name: 'dog',
            },
            name: 'Tommy',
            photoUrls: ['string'],
            tags: [
                {
                    id: 111,
                    name: 'White',
                },
            ],
            status: 'available',
        }),
    });
 
    expect(createResponse.ok()).toBeTruthy();
    expect(createResponse.status()).toBe(200);

    const createdPetDetail = await createResponse.json();
    console.log(createdPetDetail);
    const petId = createdPetDetail.id;
 
    const updateResponse = await request.put(`${baseURL}/pet`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            id: petId,
            category: {
                id: 222,
                name: 'cat',
            },
            name: 'Jerry',
            photoUrls: ['string'],
            tags: [
                {
                    id: 222,
                    name: 'black',
                },
            ],
            status: 'Not available',
        }),
    });
 
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
 
});