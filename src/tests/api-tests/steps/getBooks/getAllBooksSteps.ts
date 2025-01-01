import { When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;

When("I fetch the list of books", async function () {
   response = await apiHelper.get("/api/books");
   Logger.info("Send GET request to fetch the list of books");
});

Then("the API should return a list of books", function () {
   Logger.info("If successful, the response status should be 200");
   Logger.info("Response status: " + response.status);
   expect(response).toBeDefined();
   expect(response.status).toBe(200);

   Logger.info("Response data should be an array of books");
   expect(response.data).toBeInstanceOf(Array);
   if (response.data.length > 0) {
      response.data.forEach((book: any) => {
         expect(book).toHaveProperty("id");
         expect(book).toHaveProperty("title");
         expect(book).toHaveProperty("author");
      });
   }
});
