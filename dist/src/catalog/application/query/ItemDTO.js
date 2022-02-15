"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemDTO {
    constructor(idItem, category, description, price, width = 0, height = 0, length = 0, weight = 0) {
        this.idItem = idItem;
        this.category = category;
        this.description = description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }
}
exports.default = ItemDTO;
