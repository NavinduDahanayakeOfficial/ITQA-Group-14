import { When, Then } from "@cucumber/cucumber";
import { apiHelper } from "../common/authSteps";
import { expect } from "playwright/test";
import { Logger } from "../../../../utils/logger";

let response: any;

When("I fetch the list of books when DB is empty", async function () {
    response = await apiHelper.get("/api/books");
    Logger.info("Send GET request to fetch the list of books");
});

Then("The API should indicate empty array with success response", function () {
    Logger.info("If no books exist, the response status should still be 200");
    Logger.info("Response status: " + response.status);
    expect(response).toBeDefined();
    expect(response.status).toBe(200);

    Logger.info("Response data should be an empty array");
    Logger.info(`Response Body: ${JSON.stringify(response.data, null, 2)}`);
    expect(response.data).toBeInstanceOf(Array);
    if (response.data.length === 0) {
        Logger.info("No books available in the response");
    } else {
        Logger.error("Books available in the response");
    }
    expect(response.data.length).toBe(0)
});
