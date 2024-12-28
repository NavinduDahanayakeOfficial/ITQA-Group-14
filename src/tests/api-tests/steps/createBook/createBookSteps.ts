import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";

let bookDetails: Book;
let response: any;

Given("I have the following book details:", function (dataTable) {
   bookDetails = dataTable.hashes()[0] as Book;
});

When("I create a new book", async function () {
   response = await apiHelper.post("/api/books", bookDetails);
});

Then("the book should be created successfully", function () {
   expect(response).toBeDefined();
   expect(response.status).toBe(201);
   expect(response.data).toHaveProperty("id");
   expect(response.data.title).toBe(bookDetails.title);
   expect(response.data.author).toBe(bookDetails.author);
});

Then("the book should not be created", async function () {
   expect(response.status).toBe(400);
});
