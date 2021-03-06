import OrderCancelled from "../../../shared/domain/event/OrderCancelled";
import Handler from "../../../shared/domain/handler/Handler";
import StockEntry from "../entity/StockEntry";
import StockRepository from "../repository/StockRepository";

export default class OrderCancelledStockHandler implements Handler {

    constructor (readonly stockRepository: StockRepository) {
    }

    async notify(orderCancelled: OrderCancelled): Promise<void> {
        for (const orderItem of orderCancelled.items) {
            const stockEntry = new StockEntry(orderItem.idItem, "in", orderItem.quantity);
            await this.stockRepository.save(stockEntry);
        }
    }
}
