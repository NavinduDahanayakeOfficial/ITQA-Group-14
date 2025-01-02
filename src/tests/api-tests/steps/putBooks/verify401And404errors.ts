import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;

Given('I am not authenticated', async function () {
   // Ensure the user is not authenticated by not setting the authentication token or invalidating it
   Logger.info("User is not authenticated");
});

When('I attempt to update the book with ID: {int}', async function (id: number) {
   // Attempt to update the book without authentication
   response = await apiHelper.put(`/api/books/${id}`, { /* updated book details */ });
   Logger.info(`Request sent to update book with ID: ${id}`);
});

Then('the server should return a {int} status code', async function (status: number) {
   Logger.info(`Expected status code: ${status}`);
   expect(response.status).toBeDefined();
   Logger.info("Actual status code: " + response.status);
   expect(response.status).toBe(status);
});

Then('the response should include an error message {string}', function (errorMessage: string) {
   Logger.info(`Expected error message: ${errorMessage}`);
   expect(response.data).toBeDefined();
   Logger.info("Response data: " + JSON.stringify(response.data));

   // Check if the response includes the expected error message
   expect(response.data.error).toBe(errorMessage);
});