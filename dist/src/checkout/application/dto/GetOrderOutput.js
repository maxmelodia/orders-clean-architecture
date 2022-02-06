"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetOrderOutput {
    constructor(code, cpf, items, freight, total) {
        this.code = code;
        this.cpf = cpf;
        this.items = items;
        this.freight = freight;
        this.total = total;
    }
}
exports.default = GetOrderOutput;
