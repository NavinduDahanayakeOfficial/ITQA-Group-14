import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: Book;
let response: any;

Given("I have the following book details", function (dataTable) {
  bookDetails = dataTable.hashes()[0] as Book;
  Logger.info("Book details with ID: " + JSON.stringify(bookDetails));
});

When("I create a book", async function () {
  Logger.info("Send POST request to /api/books to create a new book with ID");
  response = await apiHelper.post("/api/books", bookDetails);
  Logger.info("Response status: " + response.status);
});

Then("the book should not be created successfully with status 400", function () {
  Logger.info("Verifying book creation was failed");
  expect(response).toBeDefined();
  
  const expectedStatus = 400;
  if (response.status === expectedStatus) {
    Logger.info("Request failed as expected with status 400");
  } else {
    const errorMessage = `Expected response status ${expectedStatus}, but got ${response.status}`;
    Logger.error(errorMessage);
    throw new Error(errorMessage);
  }
});
