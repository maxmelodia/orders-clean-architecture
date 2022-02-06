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
Object.defineProperty(exports, "__esModule", { value: true });
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
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const [data] = yield this.databaseConnection.query("select count(*)::int from ccca.order", []);
            return data.count;
        });
    }
}
exports.default = OrderRepositoryDatabase;
