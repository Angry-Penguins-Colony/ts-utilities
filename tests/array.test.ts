import { arraysEqual } from './array';

test('array are equals', () => {
    expect(arraysEqual([1, 2, 3], [1, 2, 3]))
        .toEqual(true);

    expect(arraysEqual([1, 2, 3, 4], [1, 2, 3]))
        .toEqual(false);

    expect(arraysEqual([1, 2, 3], [1, 2, 3, 4]))
        .toEqual(false);

    // unordered
    expect(arraysEqual([3, 2, 1], [1, 2, 3]))
        .toEqual(true);
});