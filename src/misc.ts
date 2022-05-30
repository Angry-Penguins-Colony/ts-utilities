import { Address } from '@elrondnetwork/erdjs/out';

export function getSessionIdFromSearchParams(): string | null {

    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('signSession');

    return sessionId;
}

export function sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}

export function download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function getAddressFromPEM(pem: string): Address {
    const regex = /erd1.{58}/g;
    const matches = pem.match(regex);

    if (matches === null) {
        throw new Error('Could not extract address from PEM');
    }

    return Address.fromBech32(matches[0]);
}

// source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export function isValidHttpUrl(urlToTest: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(urlToTest);
}

export async function calculateHashes(fileList: FileList) {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Hash = require('ipfs-only-hash');

    const map = new Map<string, string>();

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const arrayBuffer = await file.arrayBuffer();
        const uint = new Uint8Array(arrayBuffer);

        const hash = await Hash.of(uint);

        map.set(file.name, hash);
    }

    return map;
}

export function mapToCsv(map: Map<any, any>, keyColumn: string, valueColumn: string): string {

    const keys = Array.from(map.keys());
    const values = Array.from(map.values());

    const csv = keys.map((key, index) => `${key},${values[index]}`).join('\n');

    return `${keyColumn},${valueColumn}\n${csv}`;
}