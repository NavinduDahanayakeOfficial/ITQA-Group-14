import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: Book = { id: 101, title: "Book101", author: "Author101" };
let response: any;

Given("I have a book with ID as a number", function () {
  Logger.info("Book details with numeric ID: " + JSON.stringify(bookDetails));
});

When("I create a book with numeric ID", async function () {
  Logger.info("Send POST request to /api/books to create a new book with numeric ID");
  response = await apiHelper.post("/api/books", bookDetails);
  Logger.info("Response status: " + response.status);
});

Then("the book should be created successfully with status 201", function () {
  Logger.info("Verifying book creation was successful");
  expect(response).toBeDefined();
  
  const expectedStatus = 201;
  if (response.status === expectedStatus) {
    Logger.info("Book created successfully with status 201");
  } else {
    const errorMessage = `Expected response status ${expectedStatus}, but got ${response.status}`;
    Logger.error(errorMessage);
    throw new Error(errorMessage);
  }
});