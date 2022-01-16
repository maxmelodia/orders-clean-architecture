"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(code, percentage, expireDate) {
        this.code = code;
        this.percentage = percentage;
        this.expireDate = expireDate;
    }
    isExpired(today = new Date()) {
        if (!this.expireDate)
            return false;
        return this.expireDate.getTime() < today.getTime();
    }
    isValid(today = new Date()) {
        return !this.isExpired(today);
    }
}
exports.default = Coupon;
