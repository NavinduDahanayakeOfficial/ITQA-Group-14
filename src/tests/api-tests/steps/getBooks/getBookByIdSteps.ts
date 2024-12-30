import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;

When('I have the following book ID: {int}', async function (id: number) {
   response = await apiHelper.get(`/api/books/${id}`);
   Logger.info("Request Sent");
});

Then('the book details should be not be displayed successfully with {int} status code', async function (status: number) {
   expect(response.status).toBeDefined();
   Logger.info("Status code should be 200.");
   Logger.info("Status code: " + response.status);
   expect(response.status).toBe(status);
   expect(response.data).toBeDefined();
   Logger.info("Response data: " + JSON.stringify(response.data));
});

Then('the book details should not be displayed with {int} status code', async function (status: number) {
   expect(response.status).toBeDefined();
   Logger.info("Status code should be 404.");
   Logger.info("Status code: " + response.status);
   expect(response.status).toBe(status);
   expect(response.error).toBeDefined();
   Logger.info("Response error: " + JSON.stringify(response.error));
});
