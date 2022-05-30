import { addThousandSeparator, humanizeNumber, humanizeVariableName } from '../src/humanize';


describe('humanizeNumber', () => {
    it('humanize int', () => {
        expect(humanizeNumber(1000)).toBe('1 000');
        expect(humanizeNumber(100)).toBe('100');
        expect(humanizeNumber(10)).toBe('10');
    });

    it('humanize floating', () => {
        expect(humanizeNumber(1000.1)).toBe('1 000.1');
        expect(humanizeNumber(1.1)).toBe('1.1');
    });
});

it('add thousand separator', () => {
    expect(addThousandSeparator('123456789', ' ')).toBe('123 456 789');
    expect(addThousandSeparator('123.456789', ' ')).toBe('123.456789');
    expect(addThousandSeparator('123.4567', ' ')).toBe('123.4567');
    expect(addThousandSeparator('789', ' ')).toBe('789');
    expect(addThousandSeparator('abcdefs', ' ')).toBe('abcdefs');
});

it('humanize variable name', () => {

    expect(humanizeVariableName('myVariable')).toBe('My Variable');
});