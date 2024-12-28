import { Given } from "@cucumber/cucumber";
import { ApiHelper } from "../../utils/apiHelper";
import { config } from "../../../../utils/environment";
import { Logger } from "../../../../utils/logger";

const apiHelper = new ApiHelper();

Given("I am authenticated as {string}", function (userType: string) {
   if (userType === config.credentials.api.admin.username) {
      apiHelper.setBasicAuth(config.credentials.api.admin.username);
   } else if (userType === config.credentials.api.user.username) {
      apiHelper.setBasicAuth(config.credentials.api.user.username);
   } else {
      throw new Error("Invalid user type");
   }
   Logger.info(`Authenticated as ${userType}`);
});

export { apiHelper };
