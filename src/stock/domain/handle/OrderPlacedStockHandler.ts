import OrderPlaced from "../../../shared/domain/event/OrderPlaced";
import Handler from "../../../shared/domain/handler/Handler";
import StockEntry from "../entity/StockEntry";
import StockRepository from "../repository/StockRepository";

export default class OrderPlacedStockHandler implements Handler {

    constructor (readonly stockRepository: StockRepository) {
    }

    async notify(orderPlaced: OrderPlaced): Promise<void> {
        for (const orderItem of orderPlaced.items) {
            const stockEntry = new StockEntry(orderItem.idItem, "out", orderItem.quantity);
            await this.stockRepository.save(stockEntry);
        }
    }
}
