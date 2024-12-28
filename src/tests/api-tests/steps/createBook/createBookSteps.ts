import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: Book;
let response: any;

Given("I have the following book details:", function (dataTable) {
   bookDetails = dataTable.hashes()[0] as Book;
   Logger.info("Book details: " + JSON.stringify(bookDetails));
});

When("I create a new book", async function () {
   Logger.info("Send POST request to /api/books to create a new book");
   response = await apiHelper.post("/api/books", bookDetails);
});

Then("the book should be created successfully", function () {
   Logger.info("If successful, the response status should be 201");
   Logger.info("Response status : " + response.status);
   expect(response).toBeDefined();
   expect(response.status).toBe(201);

   Logger.info("Response data should contain the created book details");
   Logger.info("Response data : " + JSON.stringify(response.data));

   if (response.data) {
      expect(response.data).toHaveProperty("id");
      expect(response.data.title).toBe(bookDetails.title);
      expect(response.data.author).toBe(bookDetails.author);
   } else {
      throw new Error("Response data is undefined");
   }
});

Then("the book should not be created", async function () {
   Logger.info("The response status should be 400")
   Logger.info("Response status : " + response.status);
   expect(response.status).toBe(400);
});
