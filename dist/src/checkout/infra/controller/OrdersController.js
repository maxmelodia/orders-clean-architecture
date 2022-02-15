"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetOrders_1 = __importDefault(require("../../application/query/GetOrders"));
const OrderDAODatabase_1 = __importDefault(require("../dao/OrderDAODatabase"));
class OrdersController {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    getOrders(params, body) {
        const getOrders = new GetOrders_1.default(new OrderDAODatabase_1.default(this.databaseConnection));
        return getOrders.execute();
    }
}
exports.default = OrdersController;
