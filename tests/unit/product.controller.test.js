const productController = require("../../controllers/product.controller");
const productModel = require("../../model/product.model");
const httpMocks = require("node-mocks-http");

const allBurritos = require("../mock-data/allBurritos.json");

productModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("productController.listBurritoProducts", () => {
    it("should have a listBurritoProducts function", () => {
        expect(typeof productController.listBurritoProducts).toBe("function");
    });
    it("should call productModel.find({})", async () => {
        await productController.listBurritoProducts(req, res, next); 
        expect(productModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all burritos", async () => {
        productModel.find.mockReturnValue(allBurritos);
        await productController.listBurritoProducts(req, res, next); 
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allBurritos);
    })
    test("on error return response with status 500 and an error message", async () => {
        const errorMessage = { message: "Error listing burritos" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.listBurritoProducts(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).not.toBe('');
    });
})