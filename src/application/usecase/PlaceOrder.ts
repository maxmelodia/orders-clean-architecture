import ItemRepository from "../../domain/repository/ItemRepository";
import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";
import PlaceOrderInput from "../dto/PlaceOrderInput";
import PlaceOrderOutput from "../dto/PlaceOrderOutput";
import PlaceOrderOutputAssembler from "../dto/PlaceOrderOutputAssembler";
import CouponRepository from "../../domain/repository/CouponRepository";

export default class PlaceOrder {

    constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository) {
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        let sequence = await this.orderRepository.count();
        const order = new Order(input.cpf, input.issueDate, ++sequence);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon);
            order.addCoupon(coupon);
        }

        this.orderRepository.save(order);
        return PlaceOrderOutputAssembler.assembly(order);
    }
}