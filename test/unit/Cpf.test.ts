import Cpf from "../../src/checkout/domain/entity/Cpf";

test("Deve validar um cpf", function () {
    const cpf = new Cpf("687.054.760-20");
    expect(cpf).toBeDefined();
});

test("Não Deve validar um cpf", function () {
    expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});
