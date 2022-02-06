import Order from "../../domain/entity/Order";
import PlaceOrderInput from "../dto/PlaceOrderInput";
import PlaceOrderOutput from "../dto/PlaceOrderOutput";
import PlaceOrderOutputAssembler from "../dto/PlaceOrderOutputAssembler";
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import FreightCalculator from "../../domain/service/FreightCalculator";

export default class PlaceOrder {
    orderRepository: any;
    itemRepository: any;
    couponRepository: any;

    constructor (abstractRepositoryFactory: AbstractRepositoryFactory) {
        this.orderRepository = abstractRepositoryFactory.createOrderRepository();
        this.itemRepository = abstractRepositoryFactory.createItemRepository();
        this.couponRepository = abstractRepositoryFactory.createCouponRepository();
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        let sequence = await this.orderRepository.count();
        const order = new Order(input.cpf, input.issueDate, ++sequence);
        let freight = 0;
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            freight += FreightCalculator.calculate(item) * orderItem.quantity;
            order.addItem(item, orderItem.quantity);
        }
        order.setFreight(freight);
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon);
            order.addCoupon(coupon);
        }

        this.orderRepository.save(order);
        return PlaceOrderOutputAssembler.assembly(order);
    }
}