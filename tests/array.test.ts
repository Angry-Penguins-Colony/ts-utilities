import { arraysEqual } from '../src/array';

describe('array are equals', () => {

    it("return true when arrays are the same", () => {
        const array = [1, 2, 3];

        expect(arraysEqual(array, array)).toBe(true);
    })

    it("return false when arrays are different", () => {

        expect(arraysEqual([1, 2, 3, 4], [1, 2, 3]))
            .toEqual(false);

        expect(arraysEqual([1, 2, 3], [1, 2, 3, 4]))
            .toEqual(false);
    });

    it("return false when one of the arrays is null", () => {

        expect(arraysEqual([1, 2, 3, 4], null))
            .toEqual(false);

        expect(arraysEqual(null, [1, 2, 3, 4]))
            .toEqual(false);
    });

    it("return true when both arrays are null", () => {
        expect(arraysEqual(null, null))

            .toEqual(true);
    });


    it("return true when arrays are equals", () => {
        expect(arraysEqual([1, 2, 3], [1, 2, 3]))
            .toEqual(true);

        // unordered
        expect(arraysEqual([3, 2, 1], [1, 2, 3]))
            .toEqual(true);
    });
});