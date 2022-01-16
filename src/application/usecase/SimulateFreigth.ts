import ItemRepository from "../../domain/repository/ItemRepository";
import SimulateFreightInput from "../dto/SimulateFreightInput";

export default class SimulateFreight {

    constructor (readonly itemRepository: ItemRepository) {

    }

    async execute (input: SimulateFreightInput): Promise<number> {
        let freight = 0;
        for (const itemInput of input.items) {
            const item = await this.itemRepository.findById(itemInput.idItem);
            freight += item.getFreight() * itemInput.quantity;
        }
        return freight;
    }
}
