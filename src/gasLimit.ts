const gasPrices = {
    simpleEgldTransfer: 50_000,
    esdtTransfer: 500_000,
    perDataByte: 1_500,
    nftTransfer: 1_000_000
};

export default class TransferFeesCalculator {
    public static calculateSimpleTransferGasFees(data: string): number {

        const baseFee = gasPrices.simpleEgldTransfer;
        const dataFee = this.calculateDataFee(data);

        return baseFee + dataFee;
    }

    public static calculateDataFee(data: string): number {
        const dataLength = Buffer.from(data).length;

        const dataFee = gasPrices.perDataByte * dataLength;
        return dataFee;
    }

    public static calculateNftTransfer(data: string): number {
        return gasPrices.nftTransfer + this.calculateDataFee(data);
    }

    public static calculateEsdtTransfer(data: string): number {
        return gasPrices.esdtTransfer + this.calculateDataFee(data);
    }
}