import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: { id: string; title: string; author: string };
let response: any;

Given("the following book exists in the system:", async function (dataTable) {
  bookDetails = dataTable.hashes()[0];
  Logger.info(`[START] Ensuring book exists: ${JSON.stringify(bookDetails)}`);

  // Check if the book exists, if not, create it
  response = await apiHelper.get(`/api/books/${bookDetails.id}`);
  if (response.status === 404) {
    Logger.info("Book not found, proceeding to create it...");
    await apiHelper.post("/api/books", bookDetails);
  }
  Logger.info(`[END] Ensuring book exists`);
});

When("I delete the book with id {string}", async function (id: string) {
  Logger.info(`[START] Attempting to delete book with ID: ${id}`);
  response = await apiHelper.delete(`/api/books/${id}`);

  if (response.status === 200 || response.status === 403) {
    Logger.info(`[DELETE] Status - ${response.status}`); // Only log status for admin/user cases
  } else {
    Logger.info(`[DELETE] Response: ${JSON.stringify(response)}`); // Log full details for other statuses
  }

  Logger.info(`[END] Delete attempt for book with ID: ${id}`);
});

Then("the book should be deleted successfully", async function () {
  Logger.info(`[START] Verifying successful deletion`);
  if (response.status === 200) {
    Logger.info(`[RESPONSE] Status - ${response.status}`);
  }
  expect(response).toBeDefined();
  expect(response.status).toBe(200);

  const checkResponse = await apiHelper.get(`/api/books/${bookDetails.id}`);
  expect(checkResponse.status).toBe(404);
  Logger.info(`[END] Verification of successful deletion`);
});

Then("the book should not be deleted", async function () {
  Logger.info(`[START] Verifying book was not deleted`);
  if (response.status === 403) {
    Logger.info(`[RESPONSE] Status - ${response.status}`);
  }
  expect(response.status).not.toBe(200);

  const checkResponse = await apiHelper.get(`/api/books/${bookDetails.id}`);
  expect(checkResponse.status).toBe(200);
  Logger.info(`[END] Verification of book existence`);
});
