"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CouponRepositoryDatabase_1 = __importDefault(require("../repository/database/CouponRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../repository/database/ItemRepositoryDatabase"));
const OrderRepositoryDatabase_1 = __importDefault(require("../repository/database/OrderRepositoryDatabase"));
class DatabaseRepositoryFactory {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    createItemRepository() {
        return new ItemRepositoryDatabase_1.default(this.databaseConnection);
    }
    createCouponRepository() {
        return new CouponRepositoryDatabase_1.default(this.databaseConnection);
    }
    createOrderRepository() {
        return new OrderRepositoryDatabase_1.default(this.databaseConnection);
    }
}
exports.default = DatabaseRepositoryFactory;
;
