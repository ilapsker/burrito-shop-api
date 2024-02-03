const orderController = require("../../controllers/order.controller");
const orderModel = require("../../model/order.model");
const httpMocks = require("node-mocks-http");

const allOrders = require("../mock-data/allOrders.json");

orderModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("orderController.listOrders", () => {
    it("should have a listOrders function", () => {
        expect(typeof orderController.listOrders).toBe("function");
    });
    it("should call orderModel.find({})", async () => {
        await orderController.listOrders(req, res, next); 
        expect(orderModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all orders", async () => {
        orderModel.find.mockReturnValue(allOrders);
        await orderController.listOrders(req, res, next); 
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allOrders);
    })
    test("on error return response with status 500 and an error message", async () => {
        const errorMessage = { message: "Error listing orders" };
        const rejectedPromise = Promise.reject(errorMessage);
        orderModel.find.mockReturnValue(rejectedPromise);
        await orderController.listOrders(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).not.toBe('');
    });
})