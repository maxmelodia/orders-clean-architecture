import OrderDTO from "../dto/OrderDTO";
import OrderItemDTO from "../dto/OrderItemDTO";

export default interface OrderDAO {

    getOrders(): Promise<OrderDTO[]>;
    getOrder(code: string): Promise<OrderDTO>;
    getOrderItems(idOrder: number): Promise<OrderItemDTO[]>;
}
