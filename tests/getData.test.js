import { getData } from '../src/utils/getData';

describe('getData()', () => {
    test('should return empty tokens for identical content', () => {
        const oldContent = 'hello';
        const newContent = 'hello';

        const { initialAnimationTokens } = getData({
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
    });

    test('should moved letters and add letters', () => {
        const oldContent = 'qwe';
        const newContent = 'q1w2e3';

        const { finalAnimationTokens } = getData({
            oldContent,
            newContent,
        });

        expect(finalAnimationTokens).to.deep.equal([
            [
                {
                    character: 'q',
                    state: 0,
                    id: 0,
                    nextPosition: 0,
                    nextRaw: 0,
                },
                {
                    character: '1',
                    state: 1,
                    id: 1,
                    nextPosition: 1,
                    nextRaw: 0,
                },
                {
                    character: 'w',
                    state: 0,
                    id: 2,
                    nextPosition: 2,
                    nextRaw: 0,
                },
                {
                    character: '2',
                    state: 1,
                    id: 3,
                    nextPosition: 3,
                    nextRaw: 0,
                },
                {
                    character: 'e',
                    state: 0,
                    id: 4,
                    nextPosition: 4,
                    nextRaw: 0,
                },
                {
                    character: '3',
                    state: 1,
                    id: 5,
                    nextPosition: 5,
                    nextRaw: 0,
                },
            ],
        ]);
    });

    test('should remove all letters and add new without moving', () => {
        const oldContent = 'qwe';
        const newContent = '123';

        const { finalAnimationTokens } = getData({
            oldContent,
            newContent,
        });

        expect(finalAnimationTokens).to.deep.equal([
            [
                {
                    character: '1',
                    state: 1,
                    id: 3,
                    nextPosition: 0,
                    nextRaw: 0,
                },
                {
                    character: '2',
                    state: 1,
                    id: 4,
                    nextPosition: 1,
                    nextRaw: 0,
                },
                {
                    character: '3',
                    state: 1,
                    id: 5,
                    nextPosition: 2,
                    nextRaw: 0,
                },
            ],
        ]);
    });

    test('should remove letters', () => {
        const oldContent = 'q1w2e3';
        const newContent = 'qwe';

        const { finalAnimationTokens } = getData({
            oldContent,
            newContent,
        });

        expect(finalAnimationTokens).to.deep.equal([
            [
                {
                    character: 'q',
                    state: 0,
                    id: 0,
                    nextPosition: 0,
                    nextRaw: 0,
                },
                {
                    character: 'w',
                    state: 0,
                    id: 2,
                    nextPosition: 1,
                    nextRaw: 0,
                },
                {
                    character: 'e',
                    state: 0,
                    id: 4,
                    nextPosition: 2,
                    nextRaw: 0,
                },
            ],
        ]);
    });

    test('should merge two lines into one', () => {
        const oldContent = `q1w
2e3`;
        const newContent = 'qwe';

        const { finalAnimationTokens } = getData({
            oldContent,
            newContent,
        });

        expect(finalAnimationTokens).to.deep.equal([
            [
                {
                    character: 'q',
                    state: 0,
                    id: 0,
                    nextPosition: 0,
                    nextRaw: 0,
                },
                {
                    character: 'w',
                    state: 0,
                    id: 2,
                    nextPosition: 1,
                    nextRaw: 0,
                },
                {
                    character: 'e',
                    state: 0,
                    id: 5,
                    nextPosition: 2,
                    nextRaw: 0,
                },
            ],
        ]);
    });

    test('should split one line into two lines', () => {
        const oldContent = 'qwe';
        const newContent = `q1w
2e3`;

        const { finalAnimationTokens } = getData({
            oldContent,
            newContent,
        });

        expect(finalAnimationTokens).to.deep.equal([
            [
                {
                    character: 'q',
                    state: 0,
                    id: 0,
                    nextPosition: 0,
                    nextRaw: 0,
                },
                {
                    character: '1',
                    state: 1,
                    id: 1,
                    nextPosition: 1,
                    nextRaw: 0,
                },
                {
                    character: 'w',
                    state: 0,
                    id: 2,
                    nextPosition: 2,
                    nextRaw: 0,
                },
            ],
            [
                {
                    character: '2',
                    state: 1,
                    id: 4,
                    nextPosition: 0,
                    nextRaw: 1,
                },
                {
                    character: 'e',
                    state: 0,
                    id: 5,
                    nextPosition: 1,
                    nextRaw: 1,
                },
                {
                    character: '3',
                    state: 1,
                    id: 6,
                    nextPosition: 2,
                    nextRaw: 1,
                },
            ],
        ]);
    });

    test('should work with empty lines', () => {
        const oldContent = 'qwe';
        const newContent = `q1w

2e3`;

        const { finalAnimationTokens } = getData({
            oldContent,
            newContent,
        });

        expect(finalAnimationTokens).to.deep.equal([
            [
                {
                    character: 'q',
                    state: 0,
                    id: 0,
                    nextPosition: 0,
                    nextRaw: 0,
                },
                {
                    character: '1',
                    state: 1,
                    id: 1,
                    nextPosition: 1,
                    nextRaw: 0,
                },
                {
                    character: 'w',
                    state: 0,
                    id: 2,
                    nextPosition: 2,
                    nextRaw: 0,
                },
            ],
            [],
            [
                {
                    character: '2',
                    state: 1,
                    id: 5,
                    nextPosition: 0,
                    nextRaw: 2,
                },
                {
                    character: 'e',
                    state: 0,
                    id: 6,
                    nextPosition: 1,
                    nextRaw: 2,
                },
                {
                    character: '3',
                    state: 1,
                    id: 7,
                    nextPosition: 2,
                    nextRaw: 2,
                },
            ],
        ]);
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
