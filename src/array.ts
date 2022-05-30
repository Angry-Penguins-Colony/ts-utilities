export function arraysEqual(a: any, b: any, equal: (a: any, b: any) => boolean = defaultCompare): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    a = a.sort();
    b = b.sort();

    for (let i = 0; i < a.length; ++i) {

        if (equal(a[i], b[i]) == false) {
            return false;
        }
    }

    return true;
}

function defaultCompare(a: any, b: any) {
    return a == b;
}