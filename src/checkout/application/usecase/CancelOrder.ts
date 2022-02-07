import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import EventBus from "../../../shared/infra/event/EventBus";
import OrderRepository from "../../domain/repository/OrderRepository";
import OrderCancelled from "../../../shared/domain/event/OrderCancelled";

export default class CancelOrder {
    orderRepository: OrderRepository;

    constructor (abstractRepositoryFactory: AbstractRepositoryFactory, readonly eventBus: EventBus) {
        this.orderRepository = abstractRepositoryFactory.createOrderRepository();
    }

    async execute (code: string): Promise<void> {
        const order = await this.orderRepository.get(code);
        order.cancel();
        await this.orderRepository.update(order);
		const items = order.getOrderItems().map(orderItem => ({ idItem: orderItem.idItem, quantity: orderItem.quantity }));
		this.eventBus.publish(new OrderCancelled(code, items));
    }
}