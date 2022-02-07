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
const OrderCancelled_1 = __importDefault(require("../../../shared/domain/event/OrderCancelled"));
class CancelOrder {
    constructor(abstractRepositoryFactory, eventBus) {
        this.eventBus = eventBus;
        this.orderRepository = abstractRepositoryFactory.createOrderRepository();
    }
    execute(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.get(code);
            order.cancel();
            yield this.orderRepository.update(order);
            const items = order.getOrderItems().map(orderItem => ({ idItem: orderItem.idItem, quantity: orderItem.quantity }));
            this.eventBus.publish(new OrderCancelled_1.default(code, items));
        });
    }
}
exports.default = CancelOrder;
