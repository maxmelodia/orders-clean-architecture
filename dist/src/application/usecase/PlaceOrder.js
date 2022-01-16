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
const Order_1 = __importDefault(require("../../domain/entity/Order"));
const PlaceOrderOutputAssembler_1 = __importDefault(require("../dto/PlaceOrderOutputAssembler"));
class PlaceOrder {
    constructor(itemRepository, orderRepository, couponRepository) {
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
        this.couponRepository = couponRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new Order_1.default(input.cpf, input.issueDate, 1);
            for (const orderItem of input.orderItems) {
                const item = yield this.itemRepository.findById(orderItem.idItem);
                order.addItem(item, orderItem.quantity);
            }
            if (input.coupon) {
                const coupon = yield this.couponRepository.findByCode(input.coupon);
                order.addCoupon(coupon);
            }
            this.orderRepository.save(order);
            return PlaceOrderOutputAssembler_1.default.assembly(order);
        });
    }
}
exports.default = PlaceOrder;
