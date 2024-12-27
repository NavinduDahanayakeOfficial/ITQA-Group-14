import { Book } from "../../types/book";
import { Given, When, Then } from "@cucumber/cucumber";
import { ApiHelper } from "../../utils/apiHelper";
import { expect } from "playwright/test";

const apiHelper = new ApiHelper();

let bookDetails: Book;
let response: any;

Given("I am authenticated as {string}", function (userType: string) {
   const password = "password";
   if(userType === "admin"){
       apiHelper.setBasicAuth("admin", password);
    } else if(userType === "user"){
        apiHelper.setBasicAuth("user", password);
    } else {
        throw new Error("Invalid user type");
    }
});

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