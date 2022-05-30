import { Address } from '@elrondnetwork/erdjs/out';

export function truncateString(str: string, displayCharCount: number) {

    return str.length > displayCharCount ? str.substring(0, displayCharCount) + '...' : str;
}

export function truncateStringByEnd(str: string, displayCharCount: number) {

    return str.length > displayCharCount ? '...' + str.substring(str.length - displayCharCount) : str;
}


export function truncateAddress(address: Address, displayCharCount: number) {

    const PREFIX_SIZE = 4;
    const MIDDLE_CONTENT = '...';

    if (displayCharCount <= PREFIX_SIZE + MIDDLE_CONTENT.length) {
        throw new Error('displayCharCount must be greater than ' + PREFIX_SIZE + MIDDLE_CONTENT);
    }

    const trailingSize = displayCharCount - (PREFIX_SIZE + MIDDLE_CONTENT.length);

    const bech32 = address.bech32();

    if (displayCharCount < bech32.length) {
        return bech32.slice(0, PREFIX_SIZE) + MIDDLE_CONTENT + bech32.slice(bech32.length - 1 - trailingSize);
    }
    else {
        return bech32;
    }
}

export function cutNonce(str: string) {
    const split = str.split('-').length;

    if (split == 2) {
        // no nonce to cut
        return str;
    }
    else if (split == 3) {
        return str.substring(0, str.lastIndexOf('-'));
    }
    else {
        if (!str) throw Error('str is empty');
        throw Error('unhandled case for ' + str);
    }
}

export function getNonce(str: string): number {
    const split = str.split('-').length;

    if (split == 3) {
        return hexToNumber(str.substring(str.lastIndexOf('-') + 1));
    }
    else {
        if (!str) throw Error('str is empty');
        throw Error('unhandled case for ' + str);
    }
}

export function hexToNumber(hex: string): number {
    const output = parseInt(hex, 16);

    if (isNaN(output)) throw Error('Hex is not a number');

    return output;
}

export function getNonceFromData(data: string) {

    if (data.startsWith('ESDTNFTTransfer') == false) {
        throw new Error('Data provided is not a transfer');
    }

    return parseInt(data.split('@')[2], 16);
}

export function isAlphaNumeric(str: string) {
    let code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
}

export function isUppercase(str: string) {
    let code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 64 && code < 91)) {
            return false;
        }
    }
    return true;
}