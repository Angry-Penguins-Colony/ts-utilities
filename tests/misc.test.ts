import { Address } from '@elrondnetwork/erdjs/out';
import { getAddressFromPEM, isValidHttpUrl, sleep } from '../src/misc';

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

describe("is valid url", () => {
    describe("return true", () => {

        it("if https", () => {
            expect(isValidHttpUrl("https://www.google.com/")).toBe(true);
        });

        it("if http", () => {
            expect(isValidHttpUrl("http://www.google.com")).toBe(true);
        });

        it("if no http prefix", () => {
            expect(isValidHttpUrl("www.google.com")).toBe(true);
        });

        it("if no www prefix", () => {
            expect(isValidHttpUrl("google.com")).toBe(true);
        });
    });

    describe("return false", () => {
        it("if is not an url", () => {
            expect(isValidHttpUrl("blabla")).toBe(false);
        })
    });
});

test("sleep", () => {

    const start = Date.now();

    return sleep(3000).then(() => {
        expect(Date.now() - start).toBeGreaterThanOrEqual(3000);
    })
})