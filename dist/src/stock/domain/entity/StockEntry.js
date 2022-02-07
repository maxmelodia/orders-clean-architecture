"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockEntry {
    constructor(idItem, operation, quantity) {
        this.idItem = idItem;
        this.operation = operation;
        this.quantity = quantity;
    }
}
exports.default = StockEntry;
