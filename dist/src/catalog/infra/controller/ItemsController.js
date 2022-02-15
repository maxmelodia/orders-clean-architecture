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
const GetItems_1 = __importDefault(require("../../application/query/GetItems"));
const ItemDAODatabase_1 = __importDefault(require("../dao/ItemDAODatabase"));
class ItemsController {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    getItems(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getItems = new GetItems_1.default(new ItemDAODatabase_1.default(this.databaseConnection));
            return yield getItems.execute();
        });
    }
}
exports.default = ItemsController;
