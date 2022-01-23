"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrderInput_1 = __importDefault(require("../../src/application/dto/PlaceOrderInput"));
const GetOrder_1 = __importDefault(require("../../src/application/query/GetOrder"));
const PlaceOrder_1 = __importDefault(require("../../src/application/usecase/PlaceOrder"));
const OrderDAODatabase_1 = __importDefault(require("../../src/infra/dao/OrderDAODatabase"));
const DatabaseConnectionAdapter_1 = __importDefault(require("../../src/infra/database/DatabaseConnectionAdapter"));
const CouponRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/CouponRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/OrderRepositoryDatabase"));
let placeOrder;
let getOrder;
beforeEach(function () {
    const datadaseConnection = new DatabaseConnectionAdapter_1.default();
    const itemRepository = new ItemRepositoryDatabase_1.default(datadaseConnection);
    const orderRepository = new OrderRepositoryDatabase_1.default(datadaseConnection);
    const couponRepository = new CouponRepositoryDatabase_1.default(datadaseConnection);
    placeOrder = new PlaceOrder_1.default(itemRepository, orderRepository, couponRepository);
    const orderDAO = new OrderDAODatabase_1.default(datadaseConnection);
    getOrder = new GetOrder_1.default(orderDAO);
});
test("Deve obter um pedido pelo código", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = new PlaceOrderInput_1.default("687.054.760-20", [
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
        ], new Date("2021-03-01"), "VALE20");
        const placeOrderOutput = yield placeOrder.execute(input);
        const getOrderOutput = yield getOrder.execute(placeOrderOutput.code);
        console.log(getOrderOutput);
        expect(getOrderOutput.total).toBe(4872);
    });
});
