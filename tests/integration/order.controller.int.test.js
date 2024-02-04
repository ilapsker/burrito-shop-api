const request = require("supertest");
const app = require("../../app");
const newOrder = require("../mock-data/newOrder.json");

const baseUrl = "http://" + process.env.HOSTNAME + ":" + process.env.PORT;
const endpointUrl = "/api/orders";

let firstOrder;

describe("orders integration tests", () => {
    it("should return error 403 on incorrect apiKey passed with POST" + endpointUrl,
         async () => {
            const response = await request(baseUrl)
            .post(endpointUrl)
            // Wrong key
            .set('x-api-key', '12345')
        .send({});
            expect(response.statusCode).toBe(403);
        }
    );
    it("POST " + endpointUrl, async () => {
        const response = await request(baseUrl)
          .post(endpointUrl)
          .set('x-api-Key', process.env.TEST_API_KEY)
          .send(newOrder);
        expect(response.statusCode).toBe(201);
        expect(response.body.totalCost).toBe(newOrder.totalCost);
        // TO DO expand into items list
    });

    it("should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
          const response = await request(baseUrl)
            .post(endpointUrl)
            .set('x-api-Key', process.env.TEST_API_KEY)
            // Missing totalCount
            .send({});
          expect(response.statusCode).toBe(500);
           // TO DO expand into items list
        }
    );

    test("GET " + endpointUrl, async () => {
        const response = await request(baseUrl).get(endpointUrl)
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].totalCost).toBeDefined();
        expect(Array.isArray(response.body[0].items)).toBeTruthy();
        firstOrder = response.body[0];
        // TO DO expand into items list
    });

    test("GET by Id " + endpointUrl + "/orderId", async () => {
        const response = await request(baseUrl).get(endpointUrl + "/" + firstOrder._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.totalCost).toBeDefined();
        expect(response.body.totalCost).toBe(firstOrder.totalCost);
        // TO DO expand into items list
    }); 

    test("GET by Id doesn't exist" + endpointUrl + ":orderId", async () => {
        const response = await request(baseUrl).get(
          endpointUrl + ":" + "65becd9943bf4f6927d85d82"
        );
        expect(response.statusCode).toBe(404);
    });
});
