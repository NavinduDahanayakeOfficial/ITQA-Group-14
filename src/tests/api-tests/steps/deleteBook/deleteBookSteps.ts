import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;

When('I have th book ID: {int}', async function (id: number) {
   response = await apiHelper.delete(`/api/books/${id}`);
   Logger.info("Request Sent");
});

Then('the book should be deleted successfully with {int} status code', async function (status: number) {
   expect(response.status).toBeDefined();
   Logger.info("Status code should be: " + status);
   Logger.info("Status code got: " + response.status);
   expect(response.status).toBe(status);
   expect(response.data).toBeDefined();
   Logger.info("Response data: " + JSON.stringify(response.data));
});

Then('the book should not be deleted with {int} status code', async function (status: number) {
   expect(response.status).toBeDefined();
   Logger.info("Status code should be: " + status);
   Logger.info("Status code got: " + response.status);
   expect(response.status).toBe(status);
   expect(response.error).toBeDefined();
   Logger.info("Response error: " + JSON.stringify(response.error));
});
