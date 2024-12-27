import { request } from "playwright";

export class ApiHelper {
   private baseUrl: string = "http://localhost:7081";
   private authHeader: string = "";

   setBasicAuth(username: string, password: string) {
      const credentials = Buffer.from(`${username}:${password}`).toString(
         "base64"
      );
      this.authHeader = `Basic ${credentials}`;
   }

   async get(endpoint: string) {
      const context = await request.newContext();

      try {
         return await context.get(`${this.baseUrl}${endpoint}`, {
            headers: {
               Authorization: this.authHeader,
            },
         });
      } catch (error) {
         return error;
      } finally {
         await context.dispose();
      }
   }

   async post(endpoint: string, data: any) {
      const context = await request.newContext();

      try {
         const response =  await context.post(`${this.baseUrl}${endpoint}`, {
            headers: {
               Authorization: this.authHeader,
               "Content-Type": "application/json",
            },
            data: data,
         });

         const responseData = {
            status: response.status(),
            data: await response.json(),
         }

         return responseData;

      } catch (error: any) {
         if(error.response){
            return {
               status: error.response.status(),
               error: await error.response.json(),
            }
         }
      } finally {
         await context.dispose();
      }
   }
}
