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
const ItemsController_1 = __importDefault(require("../../../catalog/infra/controller/ItemsController"));
const OrdersController_1 = __importDefault(require("../../../checkout/infra/controller/OrdersController"));
class Router {
    constructor(http, databaseConnection, eventBus) {
        this.http = http;
        this.databaseConnection = databaseConnection;
        this.eventBus = eventBus;
        this.configure();
    }
    configure() {
        this.http.on("/orders", "get", (params, body) => __awaiter(this, void 0, void 0, function* () {
            const ordersController = new OrdersController_1.default(this.databaseConnection, this.eventBus);
            return ordersController.getOrders(params, body);
        }));
        this.http.on("/orders", "post", (params, body) => __awaiter(this, void 0, void 0, function* () {
            const ordersController = new OrdersController_1.default(this.databaseConnection, this.eventBus);
            const order = yield ordersController.placeOrder(params, body);
            return order;
        }));
        this.http.on("/items", "get", (params, body) => __awaiter(this, void 0, void 0, function* () {
            const itemsController = new ItemsController_1.default(this.databaseConnection);
            const items = itemsController.getItems(params, body);
            return items;
        }));
    }
}
exports.default = Router;
