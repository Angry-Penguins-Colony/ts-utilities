import { Address } from '@elrondnetwork/erdjs/out';
import { numberToHex, stringToHex } from '../src/convert';
import { DataBuilder } from '../src/DataBuilder';

const NAME = 'MyToken';
const TICKER = 'TICKER';
const COLLECTION = TICKER + 'a1a1a1';
const ADDR_BECH32 = 'erd1c0hhz2xcnsdk6630um7k8jrg2k8zvvpwf39e83xsg8mq68rsettqzdhhjq';
const ADDR_HEX = 'c3ef7128d89c1b6d6a2fe6fd63c868558e26302e4c4b93c4d041f60d1c70cad6';

const ADDR_2_BECH32 = 'erd1tlk4s9lr55a0azv6u90k396d594alsucct8u34lpezhuhng02c8q9zeuat';
const ADDR_2_HEX = '5fed5817e3a53afe899ae15f68974da16bdfc398c2cfc8d7e1c8afcbcd0f560e';

test('build data issue SFT', () => {

    const expected = 'issueSemiFungible' +
        '@' + stringToHex(NAME) +
        '@' + stringToHex(TICKER) +
        '@' + stringToHex('canFreeze') + '@' + stringToHex('true') +
        '@' + stringToHex('canWipe') + '@' + stringToHex('true') +
        '@' + stringToHex('canPause') + '@' + stringToHex('true') +
        '@' + stringToHex('canTransferNFTCreateRole') + '@' + stringToHex('true') +
        '@' + stringToHex('canChangeOwner') + '@' + stringToHex('true') +
        '@' + stringToHex('canUpgrade') + '@' + stringToHex('true') +
        '@' + stringToHex('canAddSpecialRoles') + '@' + stringToHex('true');


    const actual = new DataBuilder().buildIssueSFT(NAME, TICKER);

    expect(actual).toBe(expected);
});

test('build data issue NFT', () => {


    const expected = 'issueNonFungible' +
        '@' + stringToHex(NAME) +
        '@' + stringToHex(TICKER) +
        '@' + stringToHex('canFreeze') + '@' + stringToHex('true') +
        '@' + stringToHex('canWipe') + '@' + stringToHex('true') +
        '@' + stringToHex('canPause') + '@' + stringToHex('true') +
        '@' + stringToHex('canTransferNFTCreateRole') + '@' + stringToHex('true') +
        '@' + stringToHex('canChangeOwner') + '@' + stringToHex('true') +
        '@' + stringToHex('canUpgrade') + '@' + stringToHex('true') +
        '@' + stringToHex('canAddSpecialRoles') + '@' + stringToHex('true');


    const actual = new DataBuilder().buildIssueNFT(NAME, TICKER);

    expect(actual).toBe(expected);
});

test('setCreateRole', () => {

    const ESDTRoleNFTCreate = 'ESDTRoleNFTCreate';

    const expected = 'setSpecialRole'
        + '@' + stringToHex(TICKER)
        + '@' + ADDR_HEX
        + '@' + stringToHex(ESDTRoleNFTCreate);

    const actual = new DataBuilder().buildSetCreateRole(TICKER, new Address(ADDR_BECH32));

    expect(actual).toBe(expected);
});

test('setCreateBurn', () => {

    const ESDTRoleNFTBurn = 'ESDTRoleNFTBurn';

    const expected = 'setSpecialRole'
        + '@' + stringToHex(TICKER)
        + '@' + ADDR_HEX
        + '@' + stringToHex(ESDTRoleNFTBurn);

    const actual = new DataBuilder().buildSetCreateBurn(TICKER, new Address(ADDR_BECH32));

    expect(actual).toBe(expected);
});

test('mintNFT', () => {

    const MINT_NAME = 'Name of NFT';

    const expected = 'ESDTNFTCreate'
        + '@' + stringToHex(COLLECTION)
        + '@' + numberToHex(1)
        + '@' + stringToHex(MINT_NAME)
        + '@' + numberToHex(0)
        + '@' + ''
        + '@' + ''
        + '@' + '';

    const actual = new DataBuilder().buildMintNFT(COLLECTION, MINT_NAME, 0, '', '', ['']);

    expect(actual).toBe(expected);
});


test('mintSFT', () => {

    const MINT_NAME = 'Name of NFT';

    const expected = 'ESDTNFTCreate'
        + '@' + stringToHex(COLLECTION)
        + '@' + numberToHex(5)
        + '@' + stringToHex(MINT_NAME)
        + '@' + numberToHex(0)
        + '@' + ''
        + '@' + ''
        + '@' + '';

    const actual = new DataBuilder().buildMintSFT(COLLECTION, MINT_NAME, 5, 0, '', '', ['']);

    expect(actual).toBe(expected);
});

describe('transferNFT', () => {

    it('transfer 01 nonce', () => {

        const expected = 'ESDTNFTTransfer'
            + '@' + stringToHex(COLLECTION)
            + '@01@01'
            + '@' + ADDR_HEX
            + '@66696c6c'; // fill function

        const actual = new DataBuilder().buildTransferNFT(new Address(ADDR_BECH32), COLLECTION, 1, 'fill');

        expect(actual).toBe(expected);
    });

    it('transfer 10 nonce', () => {
        const expected = 'ESDTNFTTransfer'
            + '@' + stringToHex(COLLECTION)
            + '@0a@01'
            + '@' + ADDR_HEX
            + '@66696c6c'; // fill function

        const actual = new DataBuilder().buildTransferNFT(new Address(ADDR_BECH32), COLLECTION, 10, 'fill');

        expect(actual).toBe(expected);
    });
});

test('buildTransferCreateRole', () => {
    const expected = 'transferNFTCreateRole'
        + '@' + stringToHex(TICKER)
        + '@' + ADDR_HEX
        + '@' + ADDR_2_HEX;

    const actual = new DataBuilder().buildTransferCreateRole(TICKER, new Address(ADDR_BECH32), new Address(ADDR_2_BECH32));

    expect(actual).toBe(expected);
});