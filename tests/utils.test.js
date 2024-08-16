import Prism from 'prismjs';
import {
    extractDurationValue,
    getLanguage,
    mergeArrays,
    calculateFontSize,
    calculateDimensions,
} from '../src/utils/utils';

describe('extractDurationValue()', () => {
    it('should convert input `very slow` into proper duration value', () => {
        expect(extractDurationValue('very slow')).to.equal((5 / 3) * 1000);
    });

    it('should convert input `slow` into proper duration value', () => {
        expect(extractDurationValue('slow')).to.equal((4 / 3) * 1000);
    });

    it('should convert input `normal` into proper duration value', () => {
        expect(extractDurationValue('normal')).to.equal((3 / 3) * 1000);
    });

    it('should convert input `fast` into proper duration value', () => {
        expect(extractDurationValue('fast')).to.equal((2 / 3) * 1000);
    });

    it('should convert input `very fast` into proper duration value', () => {
        expect(extractDurationValue('very fast')).to.equal((1 / 3) * 1000);
    });
});

describe('getLanguage()', () => {
    it('should return Prism langauge from `codeHighlight` configuration property as a string', () => {
        const codeHighlight = 'javascript';

        expect(getLanguage(codeHighlight)).to.deep.equal(
            Prism.languages.javascript,
        );
    });

    it('should return Prism langauge from `codeHighlight` configuration property', () => {
        const codeHighlight = { languageName: 'javascript' };

        expect(getLanguage(codeHighlight)).to.deep.equal(
            Prism.languages.javascript,
        );
    });

    it('should return Prism langauge from `codeHighlight` configuration property', () => {
        const customLanguage = {
            val1: 'val1',
            val2: 'val2',
        };

        const codeHighlight = {
            customLanguage,
        };

        expect(getLanguage(codeHighlight)).to.deep.equal(customLanguage);
    });
});

describe('mergeArrays()', () => {
    test('should merge arrays with matching ids', () => {
        const arr1 = [
            [{ id: 1, nextPosition: 10, nextRaw: 'A' }],
            [{ id: 2, nextPosition: 20, nextRaw: 'B' }],
        ];

        const arr2 = [[{ id: 1 }], [{ id: 2 }]];

        const expected = [
            [{ id: 1, nextPosition: 10, nextRaw: 'A' }],
            [{ id: 2, nextPosition: 20, nextRaw: 'B' }],
        ];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });

    test('should leave items unchanged if no matching id is found', () => {
        const arr1 = [[{ id: 1, nextPosition: 10, nextRaw: 'A' }]];

        const arr2 = [[{ id: 2 }]];

        const expected = [[{ id: 2 }]];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });

    test('should handle nested arrays correctly', () => {
        const arr1 = [
            [{ id: 1, nextPosition: 10, nextRaw: 'A' }],
            [{ id: 2, nextPosition: 20, nextRaw: 'B' }],
        ];

        const arr2 = [[{ id: 1 }, { id: 3 }], [{ id: 2 }]];

        const expected = [
            [{ id: 1, nextPosition: 10, nextRaw: 'A' }, { id: 3 }],
            [{ id: 2, nextPosition: 20, nextRaw: 'B' }],
        ];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });

    test('should return empty array when both arrays are empty', () => {
        const arr1 = [];
        const arr2 = [];

        const expected = [];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });

    test('should return arr2 unchanged if arr1 is empty', () => {
        const arr1 = [];
        const arr2 = [[{ id: 1 }], [{ id: 2 }]];

        const expected = [[{ id: 1 }], [{ id: 2 }]];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });

    test('should handle arrays with no matching ids', () => {
        const arr1 = [[{ id: 3, nextPosition: 30, nextRaw: 'C' }]];

        const arr2 = [[{ id: 1 }], [{ id: 2 }]];

        const expected = [[{ id: 1 }], [{ id: 2 }]];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });

    test('should work when arr1 contains multiple matching items for ids in arr2', () => {
        const arr1 = [
            [{ id: 1, nextPosition: 10, nextRaw: 'A' }],
            [{ id: 1, nextPosition: 15, nextRaw: 'AA' }],
            [{ id: 2, nextPosition: 20, nextRaw: 'B' }],
        ];

        const arr2 = [[{ id: 1 }], [{ id: 2 }]];

        const expected = [
            [{ id: 1, nextPosition: 10, nextRaw: 'A' }],
            [{ id: 2, nextPosition: 20, nextRaw: 'B' }],
        ];

        expect(mergeArrays(arr1, arr2)).toEqual(expected);
    });
});

describe('calculateDimensions()', () => {
    test('should calculate dimensions with a provided fontSize', () => {
        const fontSize = 16;
        const expectedUnitWidth = Math.round(fontSize * 0.6 * 10) / 10;
        const expectedUnitHeight =
            Math.round(fontSize * 1.3529411764705883 * 10) / 10;

        const result = calculateDimensions(fontSize);

        expect(result).toEqual({
            unitWidth: expectedUnitWidth,
            unitHeight: expectedUnitHeight,
            fontSize: fontSize,
        });
    });

    test('should calculate dimensions using calculateFontSize when no fontSize is provided', () => {
        const result = calculateDimensions();
        const fontSize = calculateFontSize();
        const expectedUnitWidth = Math.round(fontSize * 0.6 * 10) / 10;
        const expectedUnitHeight =
            Math.round(fontSize * 1.3529411764705883 * 10) / 10;

        expect(result).toEqual({
            unitWidth: expectedUnitWidth,
            unitHeight: expectedUnitHeight,
            fontSize: fontSize,
        });
    });

    test('should handle very small fontSize', () => {
        const fontSize = 1;
        const expectedUnitWidth = Math.round(fontSize * 0.6 * 10) / 10;
        const expectedUnitHeight =
            Math.round(fontSize * 1.3529411764705883 * 10) / 10;

        const result = calculateDimensions(fontSize);

        expect(result).toEqual({
            unitWidth: expectedUnitWidth,
            unitHeight: expectedUnitHeight,
            fontSize: fontSize,
        });
    });

    test('should handle very large fontSize', () => {
        const fontSize = 100;
        const expectedUnitWidth = Math.round(fontSize * 0.6 * 10) / 10;
        const expectedUnitHeight =
            Math.round(fontSize * 1.3529411764705883 * 10) / 10;

        const result = calculateDimensions(fontSize);

        expect(result).toEqual({
            unitWidth: expectedUnitWidth,
            unitHeight: expectedUnitHeight,
            fontSize: fontSize,
        });
    });
});
