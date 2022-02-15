"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnectionAdapter_1 = __importDefault(require("./shared/infra/database/DatabaseConnectionAdapter"));
const ExpressAdapter_1 = __importDefault(require("./shared/infra/http/ExpressAdapter"));
const Router_1 = __importDefault(require("./shared/infra/http/Router"));
const http = new ExpressAdapter_1.default();
const databaseConnection = new DatabaseConnectionAdapter_1.default();
const router = new Router_1.default(http, databaseConnection);
http.listen(3000);
