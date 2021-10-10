import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[];

    constructor () {
        this.items = [
            new Item(1, "Peliféricos", "M2 Samsung 1TB", 1000),
            new Item(2, "Peliféricos", "Monitor Gamer LG 1234", 5000),
            new Item(3, "Peliféricos", "Teclado Multilaser", 30)
        ];
    }

    async findById(idItem: number): Promise<Item> {
        const item = this.items.find(item => item.idItem === idItem);
        if (!item) throw new Error("Item not found");
        return item;
    }
    
}