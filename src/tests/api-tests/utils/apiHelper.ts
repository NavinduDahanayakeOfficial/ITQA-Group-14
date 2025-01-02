import { request } from "playwright";
import { config } from "../../../utils/environment";
import { Logger } from "../../../utils/logger";

export class ApiHelper {
  private baseUrl: string = config.baseUrls.api;
  private authHeader: string = "";

  setBasicAuth(username: string) {
    const credentials = Buffer.from(`${username}:${config.credentials.api.password}`).toString("base64");
    this.authHeader = `Basic ${credentials}`;
  }

  async get(endpoint: string) {
    const context = await request.newContext();

    let response;
    try {
      response = await context.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: this.authHeader
        }
      });
      const responseData = {
        status: response.status(),
        data: await response.json()
      };

      Logger.info(`Response Body: ${JSON.stringify(responseData.data, null, 2)}`);

      return responseData;
    } catch (error: any) {
      return {
        status: response?.status(),
        error: await response?.text()
      };
    } finally {
      await context.dispose();
    }
  }

  async post(endpoint: string, data: any) {
    const context = await request.newContext();

    let response;
    try {
      response = await context.post(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: this.authHeader,
          "Content-Type": "application/json"
        },
        data: data
      });

      const responseData = {
        status: response.status(),
        data: response.status() === 201 ? await response.json() : await response.text()
      };

      return responseData;
    } catch (error: any) {
      return {
        status: response?.status(),
        error: await response?.text()
      };
    } finally {
      await context.dispose();
    }
  }

  async put(endpoint: string, data: any) {
    const context = await request.newContext();

    let response;
    try {
      response = await context.put(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: this.authHeader,
          "Content-Type": "application/json"
        },
        data: data
      });

      const responseData = {
        status: response.status(),
        data: await response.json()
      };

      return responseData;
    } catch (error: any) {
      return {
        status: response?.status(),
        error: await response?.text()
      };
    } finally {
      await context.dispose();
    }
  }

  async delete(endpoint: string) {
    const context = await request.newContext();

    let response;
    try {
      response = await context.delete(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: this.authHeader
        }
      });
      return {
        status: response.status(),
        body: await response.text()
      };
    } catch (error: any) {
      return {
        status: response?.status(),
        error: await response?.text()
      };
    } finally {
      await context.dispose();
    }
  }
}
