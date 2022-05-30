import { Address } from '@elrondnetwork/erdjs/out';
import { getNonceFromData, truncateAddress, truncateStringByEnd } from '../src/string';

describe('truncate address', () => {
    it('should truncate a string', () => {
        const result = truncateAddress(Address.fromBech32('erd1tlk4s9lr55a0azv6u90k396d594alsucct8u34lpezhuhng02c8q9zeuat'), 10);
        expect(result).toBe('erd1...euat');
    });

    it('should throw error', () => {
        expect(() => truncateAddress(Address.fromBech32('erd1tlk4s9lr55a0azv6u90k396d594alsucct8u34lpezhuhng02c8q9zeuat'), 6))
            .toThrow;
    });

    it('should not change address', () => {
        const result = truncateAddress(Address.fromBech32('erd1tlk4s9lr55a0azv6u90k396d594alsucct8u34lpezhuhng02c8q9zeuat'), 62);
        expect(result).toBe('erd1tlk4s9lr55a0azv6u90k396d594alsucct8u34lpezhuhng02c8q9zeuat');
    });
});

describe('truncate by end', () => {

    expect(truncateStringByEnd('hello', 3)).toBe('...llo');
});

describe('getNonceFromData', () => {
    it('should throw error if data is not a transfer', () => {
        expect(() => getNonceFromData('hatch')).toThrow();
    });

    it('should return 06', () => {
        expect(getNonceFromData('ESDTNFTTransfer@4150432d656562303163@06@01@2a4366bcd4891e8cd10a3030bae115303f7cbba7a569dd77e6b621988a0044d4')).toBe(6);
    });

    it('should return 10', () => {
        expect(getNonceFromData('ESDTNFTTransfer@4150432d656562303163@0a@01@2a4366bcd4891e8cd10a3030bae115303f7cbba7a569dd77e6b621988a0044d4')).toBe(10);
    });
});