"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetOrders_1 = __importDefault(require("../../application/query/GetOrders"));
const PlaceOrder_1 = __importDefault(require("../../application/usecase/PlaceOrder"));
const OrderDAODatabase_1 = __importDefault(require("../dao/OrderDAODatabase"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../factory/DatabaseRepositoryFactory"));
class OrdersController {
    constructor(databaseConnection, eventBus) {
        this.databaseConnection = databaseConnection;
        this.eventBus = eventBus;
    }
    getOrders(params, body) {
        const getOrders = new GetOrders_1.default(new OrderDAODatabase_1.default(this.databaseConnection));
        return getOrders.execute();
    }
    placeOrder(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeOrder = new PlaceOrder_1.default(new DatabaseRepositoryFactory_1.default(this.databaseConnection), this.eventBus);
            const order = yield placeOrder.execute(body);
            return order;
        });
    }
}
exports.default = OrdersController;
