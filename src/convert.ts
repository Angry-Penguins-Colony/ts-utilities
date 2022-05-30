import { BigNumber } from 'bignumber.js';

export function numberToHex(number: number): string {
    let hex = number.toString(16);

    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }

    return hex;
}

export function prependIfOdd(str: string, prepend: string): string {
    if (str.length % 2 !== 0) {
        return prepend + str;
    }
    else {
        return str;
    }
}

export function stringToHex(str: string) {

    //converting string into buffer
    const bufStr = Buffer.from(str, 'utf8');

    //with buffer, you can convert it into hex with following code
    return bufStr.toString('hex');

}

export function tokenDecimalToInt(quantity: BigNumber, decimal: BigNumber): BigNumber {

    if (quantity.isNegative() == true) throw new Error('Quantity must be greater than zero');
    if (decimal.isInteger() == false) throw new Error('The decimal count must be an integer');
    if (decimal.isNegative() == true) throw new Error('The decimal count must be greater than zero');

    const result = quantity.times(new BigNumber(10).exponentiatedBy(decimal));

    if (result.isInteger() == false) {
        throw new Error('The quantity amount has too much decimal.');
    }

    return result;
}

export function egldToWei(egld: number) {
    const wei = new BigNumber(egld)
        .times(new BigNumber(10).pow(18)).toString();

    return wei;
}

export function weiToEgld(wei: BigNumber): number {
    const egld = new BigNumber(wei)
        .dividedBy(new BigNumber(10).pow(18)).toNumber();

    return egld;
}

export function b64ToNumber(base64: string): number {
    return parseInt(Buffer.from(base64, 'base64').toString('hex'), 16);
}

export function gasFeesToEgld(gasFees: number) {
    const gasPrice = new BigNumber('0.000000001');
    const egld = new BigNumber(gasFees).times(gasPrice);

    return egld;
}