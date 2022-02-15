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
const Coupon_1 = __importDefault(require("../../../domain/entity/Coupon"));
const Item_1 = __importDefault(require("../../../domain/entity/Item"));
const Order_1 = __importDefault(require("../../../domain/entity/Order"));
class OrderRepositoryDatabase {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    save(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.databaseConnection.query(`
           insert into ccca.order
           (
               code, cpf, issue_date, freight, sequence, coupon, total
           )
           values
           (
               $1,$2,$3,$4,$5,$6,$7
           )
           returning *`, [
                order.getCode(),
                order.getCpf(),
                order.issueDate,
                order.getFreight(),
                order.sequence,
                order.getCoupon(),
                order.getTotal()
            ]);
            for (const orderItem of order.getOrderItems()) {
                yield this.databaseConnection.query(`
				insert into
					ccca.order_item
				(
					id_order, id_item, price, quantity
				)
				values
				(
					$1, $2, $3, $4
				)
			`, [
                    orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity
                ]);
            }
        });
    }
    get(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.databaseConnection.query("select * from ccca.order where code = $1", [code]);
            const order = new Order_1.default(orderData.cpf, orderData.issue_date, orderData.sequence);
            const orderItemsData = yield this.databaseConnection.query("select * from ccca.order_item where id_order = $1", [orderData.id]);
            for (const orderItemData of orderItemsData) {
                const [itemData] = yield this.databaseConnection.query("select * from ccca.item where id = $1", [orderItemData.id_item]);
                const item = new Item_1.default(itemData.id, itemData.category, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
                order.addItem(item, orderItemData.quantity);
            }
            order.setFreight(orderData.freight);
            const [couponData] = yield this.databaseConnection.query("select * from ccca.coupon where code = $1", [orderData.coupon]);
            if (couponData) {
                const coupon = new Coupon_1.default(couponData.code, couponData.percentage, couponData.expire_date);
                order.addCoupon(coupon);
            }
            return order;
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query("update ccca.order set status = $1 where code = $2", [order.status, order.code.value]);
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const [data] = yield this.databaseConnection.query("select count(*)::int from ccca.order", []);
            return data.count;
        });
    }
}
exports.default = OrderRepositoryDatabase;
