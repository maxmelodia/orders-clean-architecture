"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDTO {
    constructor(id, code, cpf, freight, total) {
        this.id = id;
        this.code = code;
        this.cpf = cpf;
        this.freight = freight;
        this.total = total;
    }
}
exports.default = OrderDTO;
