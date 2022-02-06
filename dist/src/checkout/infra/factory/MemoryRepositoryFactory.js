"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemRepositoryMemory_1 = __importDefault(require("../repository/memory/ItemRepositoryMemory"));
const OrderRepositoryMemory_1 = __importDefault(require("../repository/memory/OrderRepositoryMemory"));
class MemoryRepositoryFactory {
    createItemRepository() {
        return new ItemRepositoryMemory_1.default();
    }
    createCouponRepository() {
        throw new Error("Method not implemented.");
    }
    createOrderRepository() {
        return new OrderRepositoryMemory_1.default();
    }
}
exports.default = MemoryRepositoryFactory;
;
