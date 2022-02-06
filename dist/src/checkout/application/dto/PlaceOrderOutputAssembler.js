"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
class PlaceOrderOutputAssembler {
    static assembly(order) {
        const total = order.getTotal();
        return new PlaceOrderOutput_1.default(order.code.value, total);
    }
}
exports.default = PlaceOrderOutputAssembler;
