const request = require("supertest");
const app = require("../../app");

const baseUrl = "http://" + process.env.HOSTNAME + ":" + process.env.PORT;
const endpointUrl = "/api/burrito";

describe("products integration tests", () => {
  test("GET " + endpointUrl, async () => {
      const response = await request(baseUrl).get(endpointUrl)
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].name).toBeDefined();
      expect(response.body[0].sizeToPrice).toBeDefined();
  });
});