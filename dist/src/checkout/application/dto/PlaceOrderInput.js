"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderInput {
    constructor(cpf, orderItems, issueDate = new Date(), coupon) {
        this.cpf = cpf;
        this.orderItems = orderItems;
        this.issueDate = issueDate;
        this.coupon = coupon;
    }
}
exports.default = PlaceOrderInput;
