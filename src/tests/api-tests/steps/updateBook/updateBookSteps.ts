import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: Book;
let response: any;

Given("I have the following book details to update the book:", async function (dataTable) {
  bookDetails = dataTable.hashes()[0] as Book;
  Logger.info("Book details: " + JSON.stringify(bookDetails));
});

Given(
  "I am updating the book with ID: {int} and title: {string} and author: {string}",
  async function (id: number, title: string, author: string) {
    bookDetails = { id, title, author };
    Logger.info(`Book details: ${JSON.stringify(bookDetails)}`);
    response = await apiHelper.put(`/api/books/${id}`, bookDetails);
    Logger.info(`Updating book with ID: ${id}, Title: ${title}, Author: ${author}`);
  }
);

Given("I am updating the book with ID: {int} and title: {string}", async function (id: number, title: string) {
  bookDetails = { id, title , author: "F. Scott Fitzgerald" };
  Logger.info(`Book details: ${JSON.stringify(bookDetails)}`);
  response = await apiHelper.put(`/api/books/${id}`, bookDetails);
  Logger.info(`Updating book with ID: ${id}, Title: ${bookDetails.title}, Author: ${bookDetails.author}`);
});

Given("I am updating the book with ID: {int} and author: {string}", async function (id: number, author: string) {
  bookDetails = { id, title: "Updated Title", author };
  Logger.info(`Book details: ${JSON.stringify(bookDetails)}`);
  response = await apiHelper.put(`/api/books/${id}`, bookDetails);
  Logger.info(`Updating book with ID: ${id}, Title: ${bookDetails.title}, Author: ${bookDetails.author}`);
});

Then("The book should be updated successfully", async function () {
  Logger.info("Verify the response status code is 200");
  expect(response.status).toBe(200);
  Logger.info("Verify the response body contains the updated book details");
  const updatedBookDetails = await response.json();
  expect(updatedBookDetails).toEqual(bookDetails);
  expect(response.data.title).toBe(bookDetails.title);
  expect(response.data.author).toBe(bookDetails.author);
}); 

Then("The book update should be failed", async function () {
  Logger.info("Verify the response status code is 400");
  expect(response.status).toBe(400);
});