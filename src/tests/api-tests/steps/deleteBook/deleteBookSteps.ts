import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: { title: string; author: string };
let response: any;

Given("the following book exists in the system:", async function (dataTable) {
  bookDetails = dataTable.hashes()[0];
  Logger.info("Ensuring book exists in the system: " + JSON.stringify(bookDetails));

  // Check if the book exists, if not, create it
  response = await apiHelper.get(`/api/books?title=${bookDetails.title}`);
  if (response.status === 404) {
    Logger.info("Book not found, creating it...");
    await apiHelper.post("/api/books", bookDetails);
  } else {
    Logger.info("Book already exists.");
  }
});

When("I delete the book titled {string}", async function (title: string) {
  Logger.info(`Sending DELETE request for the book titled: ${title}`);
  response = await apiHelper.delete(`/api/books?title=${title}`);
});

Then("the book should be deleted successfully", async function () {
  Logger.info("Verifying book deletion response");
  Logger.info("Response status: " + response.status);
  expect(response).toBeDefined();
  expect(response.status).toBe(200);

  Logger.info("Ensuring the book is no longer in the system");
  const checkResponse = await apiHelper.get(`/api/books?title=${bookDetails.title}`);
  expect(checkResponse.status).toBe(404);
});

Then("I should see an error message {string}", function (errorMessage: string) {
  Logger.info("Verifying error response");
  Logger.info("Response status: " + response.status);
  expect(response.status).toBe(403);
  Logger.info("Response message: " + response.data.message);
  expect(response.data.message).toBe(errorMessage);
});

Then("the book should still exist in the system", async function () {
  Logger.info("Verifying the book still exists in the system");
  const checkResponse = await apiHelper.get(`/api/books?title=${bookDetails.title}`);
  expect(checkResponse.status).toBe(200);
  if ("data" in checkResponse) {
    expect(checkResponse.data.title).toBe(bookDetails.title);
  } else {
    throw new Error("Expected response to have data property");
  }
  expect(checkResponse.data.author).toBe(bookDetails.author);
});
