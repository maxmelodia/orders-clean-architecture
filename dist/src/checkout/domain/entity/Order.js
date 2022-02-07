"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderCode_1 = __importDefault(require("./OrderCode"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf, issueDate = new Date(), sequence = 1) {
        this.issueDate = issueDate;
        this.sequence = sequence;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
        this.freight = 0;
        this.code = new OrderCode_1.default(issueDate, sequence);
        this.status = "pending";
    }
    addItem(item, quantity) {
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity));
    }
    addCoupon(coupon) {
        if (coupon.isExpired(this.issueDate))
            return;
        this.coupon = coupon;
    }
    getFreight() {
        return this.freight;
    }
    setFreight(freight) {
        this.freight = freight;
    }
    ;
    getCpf() {
        return this.cpf.value;
    }
    getCoupon() {
        var _a;
        return (_a = this.coupon) === null || _a === void 0 ? void 0 : _a.code;
    }
    getCode() {
        return this.code.value;
    }
    getOrderItems() {
        return this.orderItems;
    }
    cancel() {
        this.status = "cancelled";
    }
    getTotal() {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= (total * this.coupon.percentage) / 100;
        }
        return total;
    }
}
exports.default = Order;
