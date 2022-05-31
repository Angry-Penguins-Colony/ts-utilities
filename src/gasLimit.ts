const gasPrices = {
    simpleEgldTransfer: 50000,
    esdtTransfer: 500000,
    perDataByte: 1500,
    nftTransfer: 1000000,
};

export class TransferFeesCalculator {
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