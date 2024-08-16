import { getData } from '../src/utils/getData';

describe('getData()', () => {
    test('should return empty tokens for identical content', () => {
        const oldContent = 'hello';
        const newContent = 'hello';

        const { initialAnimationTokens, isThereMovedItems } = getData({
            oldContent,
            newContent,
        });

        expect(initialAnimationTokens).to.deep.equal([
            [
                {
                    character: 'h',
                    currentPosition: 0,
                    currentRaw: 0,
                    nextPosition: 0,
                    nextRaw: 0,
                    state: 0,
                    id: 0,
                },
                {
                    character: 'e',
                    currentPosition: 1,
                    currentRaw: 0,
                    nextPosition: 1,
                    nextRaw: 0,
                    state: 0,
                    id: 1,
                },
                {
                    character: 'l',
                    currentPosition: 2,
                    currentRaw: 0,
                    nextPosition: 2,
                    nextRaw: 0,
                    state: 0,
                    id: 2,
                },
                {
                    character: 'l',
                    currentPosition: 3,
                    currentRaw: 0,
                    nextPosition: 3,
                    nextRaw: 0,
                    state: 0,
                    id: 3,
                },
                {
                    character: 'o',
                    currentPosition: 4,
                    currentRaw: 0,
                    nextPosition: 4,
                    nextRaw: 0,
                    state: 0,
                    id: 4,
                },
            ],
        ]);

        expect(isThereMovedItems).toBe(true);
    });

    test('should detect added characters', () => {
        const oldContent = 'hello';
        const newContent = 'hello world';

        const {
            initialAnimationTokens,
            finalAnimationTokens,
            isThereMovedItems,
        } = getData({
            oldContent,
            newContent,
        });

        // Initial tokens remain the same as the old content
        expect(initialAnimationTokens[0].length).toBe(5);

        // Final tokens have additional tokens for the new characters
        expect(finalAnimationTokens[0].length).toBe(11);

        expect(isThereMovedItems).toBe(true);
    });

    test('should detect removed characters', () => {
        const oldContent = 'hello world';
        const newContent = 'hello';

        const {
            initialAnimationTokens,
            finalAnimationTokens,
            isThereMovedItems,
        } = getData({
            oldContent,
            newContent,
        });

        expect(initialAnimationTokens[0].length).toBe(11);

        expect(finalAnimationTokens[0].length).toBe(5);

        expect(isThereMovedItems).toBe(true);
    });
});
