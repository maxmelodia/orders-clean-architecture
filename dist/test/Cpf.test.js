"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("../src/Cpf"));
test("Deve validar um cpf", function () {
    const cpf = new Cpf_1.default("687.054.760-20");
    expect(cpf).toBeDefined();
});
test("Não Deve validar um cpf", function () {
    expect(() => new Cpf_1.default("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});
