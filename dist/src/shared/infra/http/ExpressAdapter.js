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
const express_1 = __importDefault(require("express"));
class ExpressAdapter {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.all("*", function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
            next();
        });
        this.app.use(express_1.default.json());
    }
    on(url, method, fn) {
        this.app[method](url, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield fn(req.params, req.body);
                res.json(result);
            });
        });
    }
    listen(port) {
        this.app.listen(port);
    }
}
exports.default = ExpressAdapter;
