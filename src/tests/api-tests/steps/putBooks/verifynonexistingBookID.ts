// import { When, Then, Given } from "@cucumber/cucumber";
// import { apiHelper } from "../common/authSteps";
// import { expect } from "playwright/test";
// import { Logger } from "../../../../utils/logger";


// let response: any;

// When('I attempt to update the book with ID: {int}', async function (id: number) {
//     // Attempt to update a book with ID 100000 (non-existent book)
//     response = await apiHelper.put('/api/books/${id}', { /* updated book details */ });
//     Logger.info('Request sent to update book with ID: ${id}');
//  });
 
//  Then('the server should return a {int} status code', async function (status: number) {
//     Logger.info('Expected status code: ${status}');
//     expect(response.status).toBeDefined();
//     Logger.info("Actual status code: " + response.status);
//     expect(response.status).toBe(status);
//  });

