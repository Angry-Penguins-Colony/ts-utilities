import { Balance } from '@elrondnetwork/erdjs/out';
import { BigNumber } from 'bignumber.js';

export function humanizeEgldBalance(balance: Balance, precision = 3): string {
    return balance.valueOf()
        .div(10 ** 18)
        .precision(precision)
        .toString();
}

export function humanizeBigNumber(n: BigNumber): string {
    return addThousandSeparator(n.toString(), ' ');
}

export function humanizeNumber(n: number): string {
    return addThousandSeparator(n.toString(), ' ');
}

export function addThousandSeparator(str: string, separator = ' '): string {


    if (str.includes('.')) {
        const [integers, decimals] = str.split('.');

        const separatedIntegers = integers.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return [separatedIntegers, decimals].join('.');
    }

    else {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
}


export function humanizeVariableName(varName: string): string {
    return varName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase(); });
}