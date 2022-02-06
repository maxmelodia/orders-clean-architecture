import Coupon from "../../src/checkout/domain/entity/Coupon";
import Item from "../../src/checkout/domain/entity/Item";
import Order from "../../src/checkout/domain/entity/Order";

test("Não deve criar um pedido com CPF inválido", function(){
    expect(() => new Order("111.111.111.-11")).toThrowError(new Error("Invalid cpf")); 
});

test("Deve criar um pedido", function(){ 
    const order = new Order("687.054.760-20");
    expect(order).toBeDefined();
});

test("Deve criar um pedido com 3 itens", function(){ 
    const order = new Order("687.054.760-20");
    order.addItem(new Item(1, "Peliféricos", "M2 Samsung 1TB", 1000),1);
    order.addItem(new Item(2, "Peliféricos", "Monitor Gamer LG 1234", 5000),1);
    order.addItem(new Item(3, "Peliféricos", "Teclado Multilaser", 30),3);
    const total = order.getTotal();
    expect(total).toBe(6090);   
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function(){ 
    const order = new Order("687.054.760-20");
    order.addItem(new Item(1, "Peliféricos", "M2 Samsung 1TB", 1000),1);
    order.addItem(new Item(2, "Peliféricos", "Monitor Gamer LG 1234", 5000),1);
    order.addItem(new Item(3, "Peliféricos", "Teclado Multilaser", 30),3);
    order.addCoupon(new Coupon("VALE20",20));
    const total = order.getTotal();
    expect(total).toBe(4872);   
});

test("Deve criar um pedido com 3 itens com cupom de desconto expirado", function(){ 
    const order = new Order("687.054.760-20", new Date("2021-10-10"));
    order.addItem(new Item(1, "Peliféricos", "M2 Samsung 1TB", 1000),1);
    order.addItem(new Item(2, "Peliféricos", "Monitor Gamer LG 1234", 5000),1);
    order.addItem(new Item(3, "Peliféricos", "Teclado Multilaser", 30),3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-03-01")));
    const total = order.getTotal();
    expect(total).toBe(6090);   
});

test("Deve criar um pedido com o código gerado", function(){ 
    const order = new Order("687.054.760-20", new Date("2021-03-01"));
    order.addItem(new Item(1, "Peliféricos", "M2 Samsung 1TB", 1000),1);
    order.addItem(new Item(2, "Peliféricos", "Monitor Gamer LG 1234", 5000),1);
    order.addItem(new Item(3, "Peliféricos", "Teclado Multilaser", 30),3);
    const code = order.code;
    expect(code.value).toBe("202100000001");   
});
