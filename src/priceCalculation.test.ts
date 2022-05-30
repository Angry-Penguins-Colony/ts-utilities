import { BigNumber } from 'bignumber.js';
import { calculatePriceFromNft, ERR_PRICE_LIST_TOO_SMALL } from './priceCalculation';

describe('calculate price', () => {
    const priceList = [
        10,
        9,
        8,
        7,
        6
    ].map(n => new BigNumber(n));


    it('buy one', () => {
        expect(calculatePriceFromNft(1, 0, priceList))
            .toStrictEqual(new BigNumber(10));
    });

    it('buy two', () => {
        expect(calculatePriceFromNft(2, 0, priceList))
            .toStrictEqual(new BigNumber(9 * 2));
    });

    it('buy two from two', () => {
        expect(calculatePriceFromNft(2, 2, priceList))
            .toStrictEqual(new BigNumber(7 * 2));
    });

    it('buy entire from zero', () => {
        expect(calculatePriceFromNft(5, 0, priceList))
            .toStrictEqual(new BigNumber(6 * 5));
    });

    it('throw error', () => {
        expect(() => calculatePriceFromNft(6, 0, priceList))
            .toThrowError(ERR_PRICE_LIST_TOO_SMALL);
    });

    it('throw error', () => {
        expect(() => calculatePriceFromNft(1, 5, priceList))
            .toThrowError(ERR_PRICE_LIST_TOO_SMALL);
    });
});

export { };