"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderCancelled {
    constructor(code, items) {
        this.code = code;
        this.items = items;
        this.name = "OrderCancelled";
    }
}
exports.default = OrderCancelled;
