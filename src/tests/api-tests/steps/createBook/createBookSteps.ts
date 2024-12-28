import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";


let bookDetails: Book;
let response: any;


Given("I have the following book details:", function (dataTable) {
   bookDetails = dataTable.hashes()[0] as Book;
});

When("I send a POST request to {string}", async function (endpoint: string) {
   response = await apiHelper.post(endpoint, bookDetails);
});

Then("the response status code should be 201", async function(){
    expect(response.status).toBe(201);
})

Then("the book should be created successfully", async function () {
   const data = response.data;
   expect(data).toHaveProperty("id");
   expect(data.title).toBe(bookDetails.title);
   expect(data.author).toBe(bookDetails.author);
});


Then ("the response status code should be 400", async function(){
    expect(response.status).toBe(400);
})