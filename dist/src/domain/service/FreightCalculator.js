"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FreightCalculator {
    static calculate(item) {
        const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
        return (freight < 10) ? 10 : freight;
    }
}
exports.default = FreightCalculator;
