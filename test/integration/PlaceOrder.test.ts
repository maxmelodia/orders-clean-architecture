import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";

test.skip("Deve fazer um pedido", async function() {
    const input =  {
        cpf: "687.054.760-20",
        orderItems: [
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
        ]
    }

    const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(new DatabaseConnectionAdapter()), new OrderRepositoryMemory());
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6090);
});
