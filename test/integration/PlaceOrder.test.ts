import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/application/dto/PlaceOrderInput";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";

let placeOrder: PlaceOrder;

beforeEach(function() {
    const datadaseConnection = new DatabaseConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(datadaseConnection);
    const orderRepository = new OrderRepositoryDatabase(datadaseConnection);
    const couponRepository = new CouponRepositoryDatabase(datadaseConnection);
    placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
});

test("Deve fazer um pedido", async function() {
    const input =  new PlaceOrderInput(
        "687.054.760-20", 
        [
            {
                idItem: 1,
                quantity: 1
            },
            {
                idItem: 2,
                quantity: 1
            },
            {
                idItem: 3,
                quantity: 3
            }
        ], new Date("2021-03-01"),
        "VALE20"
    );
    
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(4872);
    expect(output.code).toBe("202100000001");
});
