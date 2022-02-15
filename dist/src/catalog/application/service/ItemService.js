"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemService {
    constructor(itemDAO) {
        this.itemDAO = itemDAO;
    }
    saveItem(itemDTO) {
        this.itemDAO.save(itemDTO);
    }
}
exports.default = ItemService;
