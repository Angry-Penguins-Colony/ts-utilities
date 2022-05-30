import { Address } from '@elrondnetwork/erdjs/out';
import { getAddressFromPEM } from './misc';

describe('extract address from pem', () => {
    it('should return address', () => {

        const pem = `-----BEGIN PRIVATE KEY for erd1k93zx3t0vsaeqgv9fvq2vs72zjm9lj2fcym47txgae8eyte4gkkq5dt6sk-----
        AJshXPYVNuAJshXPYVNuAJshXPYVNuAJshXPYVNuAJshXPYVNuAJshXPYVNu
        XqLpCFUTJoXqLpCFUTJoXqLpCFUTJoXqLpCFUTJoXqLpCFUTJoXqLpCFUTJoXqLpCFUTJo
        othZWSOaPpothZWSOaPp=
        -----END PRIVATE KEY for erd1k93zx3t0vsaeqgv9fvq2vs72zjm9lj2fcym47txgae8eyte4gkkq5dt6sk-----`;

        const address = getAddressFromPEM(pem);

        expect(address).toStrictEqual(Address.fromBech32('erd1k93zx3t0vsaeqgv9fvq2vs72zjm9lj2fcym47txgae8eyte4gkkq5dt6sk'));
    });
});