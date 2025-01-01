import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;

When("I attempt to delete the book with ID {string}", async function (bookId: string) {
  Logger.info(`Sending DELETE request for a non-existent book with ID: ${bookId}`);
  response = await apiHelper.delete(`/api/books/${bookId}`);
});

Then("I should see a 404 response code", function () {
  Logger.info("Verifying the response status is 404");
  Logger.info("Response status: " + response.status);
  expect(response).toBeDefined();
  expect(response.status).toBe(404);
});

Then("I should see an error message {string}", function (errorMessage: string) {
  Logger.info("Verifying the error message in the response");
  Logger.info("Response message: " + response.data.message);
  expect(response.data.message).toBe(errorMessage);
});
