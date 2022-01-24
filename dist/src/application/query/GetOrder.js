"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetOrderOutput_1 = __importDefault(require("../dto/GetOrderOutput"));
class GetOrder {
    constructor(orderDAO) {
        this.orderDAO = orderDAO;
    }
    execute(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderDAO.getOrder(code);
            const orderItemsData = yield this.orderDAO.getOrderItems(orderData.id);
            const getOrderOutput = new GetOrderOutput_1.default(orderData.code, orderData.cpf, orderItemsData, orderData.freight, orderData.total);
            return getOrderOutput;
        });
    }
}
exports.default = GetOrder;
