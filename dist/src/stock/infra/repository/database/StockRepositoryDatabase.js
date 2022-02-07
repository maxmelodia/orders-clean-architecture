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
Object.defineProperty(exports, "__esModule", { value: true });
class StockRepositoryDatabase {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    save(stockEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseConnection.query("insert into ccca.stock_entry (id_item, operation, quantity, date) values ($1, $2, $3, $4)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity, new Date()]);
        });
    }
}
exports.default = StockRepositoryDatabase;
