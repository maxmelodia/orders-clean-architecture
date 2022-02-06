"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderCode {
    constructor(date, sequence) {
        this.date = date;
        this.sequence = sequence;
        if (!sequence || !(typeof sequence === "number"))
            throw new Error("Invalid parameter");
        const year = date.getFullYear();
        const sequence8char = `${sequence}`.padStart(8, "0");
        this.value = `${year}${sequence8char}`;
    }
}
exports.default = OrderCode;
