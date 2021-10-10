import DatabaseConnection from "../../database/DatabaseConnection";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemsRepositoryDatabase implements ItemRepository {

    constructor (readonly databaseConnection: DatabaseConnection) {

    }

    async findById(idItem: number): Promise<Item> {
        const [itemsData] = await this.databaseConnection.query("select * from ccca.item where id = $1", [idItem]);
        const item =  new Item(itemsData.id, itemsData.category, itemsData.description, parseFloat(itemsData.price));
        return item;
    }

}