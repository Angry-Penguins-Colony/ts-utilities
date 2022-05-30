import { TransferFeesCalculator } from '../src/gasLimit';

describe('calculate data fees', () => {
    it('should return the correct gas limit', () => {
        const gasLimit = TransferFeesCalculator.calculateDataFee('');
        expect(gasLimit).toEqual(0 * 1500);
    });

    it('should return the correct gas limit', () => {
        const gasLimit = TransferFeesCalculator.calculateDataFee('five5');
        expect(gasLimit).toEqual(5 * 1500);
    });

    it('should throw error if data length is negative', () => {
        const gasLimit = TransferFeesCalculator.calculateDataFee('🐧');
        expect(gasLimit).toEqual(4 * 1500);
    });
});

describe('calculate simple transfer gas fees', () => {
    it('should return the correct gas limit', () => {
        const gasLimit = TransferFeesCalculator.calculateSimpleTransferGasFees('');
        expect(gasLimit).toEqual(50000);
    });

    it('should return the correct gas limit', () => {
        const gasLimit = TransferFeesCalculator.calculateSimpleTransferGasFees('five5');
        expect(gasLimit).toEqual(50000 + 5 * 1500);
    });
});

describe('calculate nft transfer', () => {
    expect(TransferFeesCalculator.calculateNftTransfer('ESDTNFTTransfer@4841542d613161316131@01@01@b16223456f643b9021854b00a643ca14b65fc949c1375f2cc8ee4f922f3545ac'))
        .toEqual(1_160_500);
});

describe('calculate esdt transfer', () => {
    expect(TransferFeesCalculator.calculateEsdtTransfer(''))
        .toEqual(500_000);
});