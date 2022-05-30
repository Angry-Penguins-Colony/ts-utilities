import { BigNumber } from 'bignumber.js';

export const ERR_PRICE_LIST_TOO_SMALL = 'The price list cannot fit nftCount inside.';

export function calculatePriceFromNft(nftCount: number, alreadyBought: number, priceList: BigNumber[]): BigNumber {

    if (nftCount + alreadyBought > priceList.length) {
        throw new Error(ERR_PRICE_LIST_TOO_SMALL);
    }

    const index = nftCount + alreadyBought - 1;

    const price = priceList[index];

    if (price == undefined) {
        throw new Error(`Price list index ${index} is undefined.`);
    }

    return price.multipliedBy(nftCount);
}