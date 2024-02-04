const orderController = require("../../controllers/order.controller");
const orderModel = require("../../model/order.model");
const httpMocks = require("node-mocks-http");

const allOrders = require("../mock-data/allOrders.json");
const newOrder = require("../mock-data/newOrder.json");


orderModel.find = jest.fn();
orderModel.create = jest.fn();
orderModel.findById = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("orderController.submitOrder", () => {
    beforeEach(() => {
      req.body = newOrder;
    });
      
    it("should have a submitOrder function", () => {
        expect(typeof orderController.submitOrder).toBe("function");
    });

    it("should call orderModel.create", () => {
        orderController.submitOrder(req, res, next);
        expect(orderModel.create).toBeCalledWith(newOrder);
    });

    it("should return 201 response code", async () => {
        await orderController.submitOrder(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    test("on error return response with status 500 and an error message", async () => {
        const errorMessage = { message: "Error submiting order" };
        const rejectedPromise = Promise.reject(errorMessage);
        orderModel.create.mockReturnValue(rejectedPromise);
        await orderController.submitOrder(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        
        const resData = res._getJSONData();
        expect(resData).not.toBe('');
        expect(resData.message).not.toBeUndefined();
        expect(resData.message).not.toBe('');
    });
});

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
    });

    test("on error return response with status 500 and an error message", async () => {
        const errorMessage = { message: "Error listing orders" };
        const rejectedPromise = Promise.reject(errorMessage);
        orderModel.find.mockReturnValue(rejectedPromise);
        await orderController.listOrders(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        
        const resData = res._getJSONData();
        expect(resData).not.toBe('');
        expect(resData.message).not.toBeUndefined();
        expect(resData.message).not.toBe('');
    });
});

describe("orderController.getOrderById", () => {
    it("should have a getOrderById", () => {
        expect(typeof orderController.getOrderById).toBe("function");
    });

    it("should call orderModel.findById with route parameters", async () => {
        req.params.orderId = "65be7b037c4a08eb05777ac0";
        await orderController.getOrderById(req, res, next);
        expect(orderModel.findById).toBeCalledWith("65be7b037c4a08eb05777ac0");
    });

    it("should return json body and response code 200", async () => {
        orderModel.findById.mockReturnValue(newOrder);
        await orderController.getOrderById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newOrder);
        expect(res._isEndCalled()).toBeTruthy();
    });
    
    it("should do error handling", async () => {
        const errorMessage = { message: "error finding todoModel" };
        const rejectedPromise = Promise.reject(errorMessage);
        orderModel.findById.mockReturnValue(rejectedPromise);
        await orderController.getOrderById(req, res, next);

        const resData = res._getJSONData();
        expect(resData).not.toBe('');
        expect(resData.message).not.toBeUndefined();
        expect(resData.message).not.toBe('');
    });
});