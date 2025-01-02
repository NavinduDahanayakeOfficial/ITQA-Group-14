import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: Book;
let response: any;

Given("I have the following book details with ID:", function (dataTable) {
  bookDetails = dataTable.hashes()[0] as Book;
  Logger.info("Book details with ID: " + JSON.stringify(bookDetails));
});

When("I create a new book with ID", async function () {
  Logger.info("Send POST request to /api/books to create a new book with ID");
  response = await apiHelper.post("/api/books", bookDetails);
  Logger.info("Response status: " + response.status);
});

Then("the book should {string}", function (outcome) {
  Logger.info(`Verifying book creation outcome: ${outcome}`);
  if (outcome === "be created successfully") {
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
  } else if (outcome === "not be created") {
    expect(response).toBeDefined();
    expect(response.status).toBe(400);
  } else {
    throw new Error(`Unexpected outcome: ${outcome}`);
  }
});

Then("duplicate entries should not be created", async function () {
  Logger.info("Verifying behavior for duplicate entries.");
  const duplicateResponse = await apiHelper.post("/api/books", bookDetails);
  Logger.info("Duplicate response status: " + duplicateResponse.status);
  expect(duplicateResponse.status).toBe(409); // Expecting conflict
});