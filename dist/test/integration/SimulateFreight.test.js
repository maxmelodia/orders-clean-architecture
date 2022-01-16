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
const SimulateFreightInput_1 = __importDefault(require("../../src/application/dto/SimulateFreightInput"));
const SimulateFreigth_1 = __importDefault(require("../../src/application/usecase/SimulateFreigth"));
const DatabaseConnectionAdapter_1 = __importDefault(require("../../src/infra/database/DatabaseConnectionAdapter"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
test("Deve simular o frete dos produtos", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const databaseConnection = new DatabaseConnectionAdapter_1.default();
        const itemRepository = new ItemRepositoryDatabase_1.default(databaseConnection);
        const simulateFreight = new SimulateFreigth_1.default(itemRepository);
        const input = new SimulateFreightInput_1.default([
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
        ]);
        const freight = yield simulateFreight.execute(input);
        expect(freight).toBe(280);
    });
});
