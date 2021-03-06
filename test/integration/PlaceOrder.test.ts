import PlaceOrder from "../../src/checkout/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/checkout/application/dto/PlaceOrderInput";
import DatabaseConnectionAdapter from "../../src/checkout/infra/database/DatabaseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/checkout/infra/factory/DatabaseRepositoryFactory";
import EventBus from "../../src/shared/infra/event/EventBus";
import OrderPlacedStockHandler from "../../src/stock/domain/handle/OrderPlacedStockHandler";
import StockRepositoryDatabase from "../../src/stock/infra/repository/database/StockRepositoryDatabase";

let placeOrder: PlaceOrder;

beforeEach(function() {
    const databaseConnection = new DatabaseConnectionAdapter();
    const databaseRepositoryFactory = new DatabaseRepositoryFactory(databaseConnection);
    const eventBus = new EventBus();
    eventBus.subscribe("OrderPlaced", new OrderPlacedStockHandler(new StockRepositoryDatabase(databaseConnection)));
    placeOrder = new PlaceOrder(databaseRepositoryFactory, eventBus);
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
});
