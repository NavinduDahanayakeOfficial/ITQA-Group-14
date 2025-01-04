import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;


When('I am updating a book with ID: {int} and title: {string} and author: {string}', async function (id: number, title: string, author: string) {
    const updatedBookDetails = {
      id: id,
        title: title,
        author: author,
    };

    // Attempt to update the book
    response = await apiHelper.put(`/api/books/${id}`, updatedBookDetails);
    Logger.info(`Request sent to update book with ID: ${id}`);
    Logger.info(`Request body: ${JSON.stringify(updatedBookDetails)}`);
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
    expect(response.data.error).toBe(errorMessage);
});

Then('the response body should contain:', function (table: any) {
    Logger.info("Validating response body...");
    const expectedFields = table.rowsHash();
    for (const [field, value] of Object.entries(expectedFields)) {
        expect(response.data).toHaveProperty(field);
        expect(response.data[field]).toBe(value);
        Logger.info(`Validated field ${field} with value ${value}`);
    }
});