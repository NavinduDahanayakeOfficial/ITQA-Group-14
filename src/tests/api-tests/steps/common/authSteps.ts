import { Given } from "@cucumber/cucumber";
import { ApiHelper } from "../../utils/apiHelper";

const apiHelper = new ApiHelper();

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

 export {apiHelper};