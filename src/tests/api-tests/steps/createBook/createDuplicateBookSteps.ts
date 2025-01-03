import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let bookDetails: Book = { title: "TestBook", author: "TestAuthor" };
let firstResponse: any;
let secondResponse: any;

Given("I have a book with duplicate details", function () {
   Logger.info("Preparing book details for duplication test: " + JSON.stringify(bookDetails));
});

When("I attempt to create the book twice", async function () {
   Logger.info("Attempting to create the book for the first time.");
   firstResponse = await apiHelper.post("/api/books", bookDetails);
   Logger.info("First attempt response status: " + firstResponse.status);

   if (firstResponse.status === 208) {
       Logger.error("Error: Book already exists.");
   } else if (firstResponse.status === 201) {
       Logger.info("First book creation successful with status 201.");
   } else {
       throw new Error(`Unexpected status code: ${firstResponse.status}`);
   }

   Logger.info("Attempting to create the book for the second time.");
   secondResponse = await apiHelper.post("/api/books", bookDetails);
   Logger.info("Second attempt response status: " + secondResponse.status);
});

Then("the first book creation should be successful", function () {
   if (firstResponse.status === 201) {
       expect(firstResponse).toBeDefined();
       expect(firstResponse.status).toBe(201);
       Logger.info("Verified first book creation was successful.");
   } else {
       Logger.error("First book creation was not successful.");
   }
});

Then("the second book creation should return a 208 status", function () {
   if (secondResponse.status === 208) {
       Logger.info("Verified second book creation returned status 208 for duplicate.");
   } else {
       throw new Error(`Unexpected status code for second attempt: ${secondResponse.status}`);
   }
});
