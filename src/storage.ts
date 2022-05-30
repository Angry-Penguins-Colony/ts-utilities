import { NetworkType } from 'structs/NetworkType';

const KEY_CURRENT_NETWORK = 'ap-currentNetwork';
const defaultNetwork = NetworkType.Devnet;

export const FORM_MINT_DATA_KEY = 'apc-form-mint-data';

export function getCurrentNetwork(): NetworkType {
    const key = localStorage.getItem(KEY_CURRENT_NETWORK) ?? defaultNetwork;

    if (key == NetworkType.Mainnet || key == NetworkType.Devnet) {
        return key as NetworkType;
    }
    else {
        return defaultNetwork;
    }
}

export function setCurrentNetwork(network: NetworkType) {
    localStorage.setItem(KEY_CURRENT_NETWORK, network);
}

export function getHideResponsabilityWarning() {
    return localStorage.getItem('ap-hideResponsabilityWarning') === 'true';
}

export function setHideResponsabilityWarning(show: boolean) {
    localStorage.setItem('ap-hideResponsabilityWarning', show.toString());
}


const PEM_KEY = 'ap-pem';

export class StorageAPC {


    public static getPem(): string | null {
        return localStorage.getItem(PEM_KEY);
    }

    public static savePem(pem: string) {
        localStorage.setItem(PEM_KEY, pem);
    }

    public static deletePem() {
        localStorage.removeItem(PEM_KEY);
    }
}