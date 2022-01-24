import PlaceOrderInput from "../../src/application/dto/PlaceOrderInput";
import GetOrder from "../../src/application/query/GetOrder";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import OrderDAODatabase from "../../src/infra/dao/OrderDAODatabase";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;

beforeEach(function() {
    const datadaseConnection = new DatabaseConnectionAdapter();
    placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(datadaseConnection));
    const orderDAO = new OrderDAODatabase(datadaseConnection);
    getOrder = new GetOrder(orderDAO);
});

test("Deve obter um pedido pelo código", async function (){
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
    
    const placeOrderOutput = await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
    expect(getOrderOutput.total).toBe(4872);
});
