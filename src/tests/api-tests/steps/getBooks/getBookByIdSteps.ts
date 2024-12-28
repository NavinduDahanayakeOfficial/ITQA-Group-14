import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";

let bookDetails: Book;
let response: any;

When("I send a GET request to {string}", async function (endpoint: string) {
   response = await apiHelper.get(endpoint);
   console.log(response);
});

Then("the response status code should be 200", async function () {
   expect(response.status).toBe(200);
});
