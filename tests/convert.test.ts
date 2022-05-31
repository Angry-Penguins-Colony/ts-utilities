import { BigNumber } from 'bignumber.js';
import { b64HexToNumber, egldToWei, gasFeesToEgld, numberToHex, prependIfOdd, tokenDecimalToInt, weiToEgld } from '../src/convert';


describe('egld to wei', () => {
    it('convert 1', () => {
        expect(egldToWei(1)).toBe('1' + '0'.repeat(18));
    });

    it('convert 0.9', () => {
        expect(egldToWei(0.9)).toBe('9' + '0'.repeat(18 - 1));
    });

    it('convert 0.875', () => {
        expect(egldToWei(0.875)).toBe('875' + '0'.repeat(18 - 3));
    });

    it('convert 10', () => {
        expect(egldToWei(10)).toBe('10' + '0'.repeat(18));
    });
});

describe("b64 to number", () => {
    it("convert 1", () => {
        expect(b64HexToNumber("AQ==")).toBe(1);
    });

    it("convert 2", () => {
        expect(b64HexToNumber("Ag==")).toBe(2);
    });
})


describe('wei to egld', () => {
    it('convert 1', () => {
        expect(weiToEgld(new BigNumber('1' + '0'.repeat(18))))
            .toBe(1);
    });

    it('convert 0.9', () => {
        expect(weiToEgld(new BigNumber('9' + '0'.repeat(18 - 1))))
            .toBe(0.9);
    });

    it('convert 0.875', () => {
        expect(weiToEgld(new BigNumber('875' + '0'.repeat(18 - 3))))
            .toBe(0.875);
    });

    expect(weiToEgld(new BigNumber('10' + '0'.repeat(18))))
        .toBe(10);
});

it('numberTOHex', () => {
    expect(numberToHex(0)).toEqual('00');
    expect(numberToHex(1)).toEqual('01');
    expect(numberToHex(10)).toEqual('0a');
    expect(numberToHex(16)).toEqual('10');
});

it('gas fees to egld', () => {
    expect(gasFeesToEgld(50_000)).toStrictEqual(new BigNumber('0.00005'));
    expect(gasFeesToEgld(63_500)).toStrictEqual(new BigNumber('0.0000635'));
});

describe('tokenDecimalToInt', () => {
    it('simple convert', () => {
        expect(tokenDecimalToInt(new BigNumber('1'), new BigNumber('0')))
            .toStrictEqual(new BigNumber(1));
    });

    it('convert with decimals', () => {
        expect(tokenDecimalToInt(new BigNumber('1.1'), new BigNumber('6')))
            .toStrictEqual(new BigNumber(1_100_000));
    });

    describe('errors', () => {

        it('throw error if not decimal', () => {
            expect(() => tokenDecimalToInt(new BigNumber('1.1'), new BigNumber('0')))
                .toThrow();
        });

        it('throw error if quantity is negative', () => {
            expect(() => tokenDecimalToInt(new BigNumber('-1'), new BigNumber('0')))
                .toThrow();
        });

        it('throw error if decimal is negative', () => {
            expect(() => tokenDecimalToInt(new BigNumber('1'), new BigNumber('-1')))
                .toThrow();
        });

        it('throw error if decimal is a float', () => {
            expect(() => tokenDecimalToInt(new BigNumber('-1'), new BigNumber('0.1')))
                .toThrow();
        });

        it('throw error if decimal is a NaN', () => {
            const NaN = new BigNumber('qfquioezfeu');

            expect(NaN.isNaN()).toBeTruthy();

            expect(() => tokenDecimalToInt(new BigNumber('1'), NaN))
                .toThrow();
        });

        it('throw error if decimal is a NaN', () => {
            const NaN = new BigNumber('qfquioezfeu');

            expect(NaN.isNaN()).toBeTruthy();

            expect(() => tokenDecimalToInt(NaN, new BigNumber(0)))
                .toThrow();
        });
    });
});

describe('prependIfOdd', () => {
    it('prepend 0 if odd', () => {
        expect(prependIfOdd('a5e', '0')).toEqual('0a5e');
    });

    it('prepend nothing if even', () => {
        expect(prependIfOdd('4a5e', '0')).toEqual('4a5e');
    });
});