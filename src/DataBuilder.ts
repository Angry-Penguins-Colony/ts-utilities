import { Address, TokenType } from '@elrondnetwork/erdjs/out';
import { stringToHex, numberToHex } from './convert';

export class DataBuilder {
    /**
     * @deprecated Use buildIssue instead
     */
    public buildIssueSFT(collectionName: string, ticker: string): string {
        console.warn('Calling deprecated function!');
        return this._buildIssue(collectionName, ticker, 'issueSemiFungible');
    }

    /**
    * @deprecated Use buildIssue instead
    */
    public buildIssueNFT(collectionName: string, ticker: string): string {
        console.warn('Calling deprecated function!');
        return this._buildIssue(collectionName, ticker, 'issueNonFungible');
    }

    public buildIssue(collectionName: string, ticker: string, tokenType: TokenType): string {
        const functionName = getFunctionName();
        return this._buildIssue(collectionName, ticker, functionName);

        function getFunctionName() {
            switch (tokenType) {
                case TokenType.Semifungible:
                    return 'issueSemiFungible';

                case TokenType.Nonfungible:
                    return 'issueNonFungible';

                default:
                    throw new Error('Invalid token type. We got ' + tokenType);
            }
        }
    }

    private _buildIssue(collectionName: string, ticker: string, functionName: string): string {
        const expected = functionName +
            '@' + stringToHex(collectionName) +
            '@' + stringToHex(ticker) +
            '@' + stringToHex('canFreeze') + '@' + stringToHex('true') +
            '@' + stringToHex('canWipe') + '@' + stringToHex('true') +
            '@' + stringToHex('canPause') + '@' + stringToHex('true') +
            '@' + stringToHex('canTransferNFTCreateRole') + '@' + stringToHex('true') +
            '@' + stringToHex('canChangeOwner') + '@' + stringToHex('true') +
            '@' + stringToHex('canUpgrade') + '@' + stringToHex('true') +
            '@' + stringToHex('canAddSpecialRoles') + '@' + stringToHex('true');

        return expected;
    }

    public buildSetCreateRole(ticker: string, addressToAssign: Address): string {
        const role = 'ESDTRoleNFTCreate';

        return 'setSpecialRole'
            + '@' + stringToHex(ticker)
            + '@' + addressToAssign.hex()
            + '@' + stringToHex(role);
    }

    public buildSetCreateAndAddQuantityRole(ticker: string, addressToAssign: Address): string {
        const ESDTRoleNFTAddQuantity = 'ESDTRoleNFTAddQuantity';
        const ESDTRoleNFTCreate = 'ESDTRoleNFTCreate';

        return 'setSpecialRole'
            + '@' + stringToHex(ticker)
            + '@' + addressToAssign.hex()
            + '@' + stringToHex(ESDTRoleNFTCreate)
            + '@' + stringToHex(ESDTRoleNFTAddQuantity);
    }

    public buildSetAddQuantity(ticker: string, addressToAssign: Address): string {
        const role = 'ESDTRoleNFTAddQuantity';

        return 'setSpecialRole'
            + '@' + stringToHex(ticker)
            + '@' + addressToAssign.hex()
            + '@' + stringToHex(role);
    }

    public buildSetCreateBurn(ticker: string, addressToAssign: Address): string {
        const role = 'ESDTRoleNFTBurn';

        return 'setSpecialRole'
            + '@' + stringToHex(ticker)
            + '@' + addressToAssign.hex()
            + '@' + stringToHex(role);
    }

    public buildTransferCreateRole(identifier: string, from: Address, to: Address) {
        return 'transferNFTCreateRole'
            + '@' + stringToHex(identifier)
            + '@' + from.hex()
            + '@' + to.hex();
    }

    public buildTransferNFT(receiver: Address, collection: string, nonce: number, scFunction: string, hexArgs: string[] = []): string {
        return 'ESDTNFTTransfer'
            + '@' + stringToHex(collection)
            + '@' + numberToHex(nonce)
            + '@01' // quantity
            + '@' + receiver.hex()
            + '@' + stringToHex(scFunction)
            + hexArgs.map(arg => '@' + arg).join('');
    }

    public buildTransferSFT(receiver: Address, collection: string, nonce: number, quantity: number, scFunction: string): string {
        return 'ESDTNFTTransfer'
            + '@' + stringToHex(collection)
            + '@' + numberToHex(nonce)
            + '@' + numberToHex(quantity) // quantity
            + '@' + receiver.hex()
            + '@' + stringToHex(scFunction);
    }

    /**
    * @deprecated Use buildMint instead
    */
    public buildMintNFT(collection: string, name: string, royalties: number, hash: string, attributes: string, uris: string[]): string {
        console.warn('Calling deprecated function!');
        return this.buildMint(collection, name, 1, royalties, hash, attributes, uris);
    }

    /**
    * @deprecated Use buildMint instead
    */
    public buildMintSFT(collection: string, name: string, quantity: number, royalties: number, hash: string, attributes: string, uris: string[]): string {
        console.warn('Calling deprecated function!');
        return this.buildMint(collection, name, quantity, royalties, hash, attributes, uris);
    }


    public buildMint(collection: string, name: string, quantity: number, royalties: number, hash: string, attributes: string, uris: string[]): string {

        if (typeof royalties != 'number') {
            throw new Error('Royalties must be a number');
        }

        if (typeof quantity != 'number') {
            throw new Error('Quantity must be a number');
        }

        return 'ESDTNFTCreate'
            + '@' + stringToHex(collection)
            + '@' + numberToHex(quantity)
            + '@' + stringToHex(name)
            + '@' + numberToHex(royalties)
            + '@' + stringToHex(hash)
            + '@' + stringToHex(attributes)
            + '@' + uris.map(uri => stringToHex(uri)).join('@');
    }
}