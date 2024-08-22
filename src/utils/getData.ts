import DiffMatchPatch from 'diff-match-patch';
import Prism from 'prismjs';

import {
    AnimationToken,
    CodeHighlight,
    TokenizedRaws,
} from '../components/MagicMotion';
import { generateID, getLanguage, letterizeTokens, mergeArrays } from './utils';

export const initializeAnimationTokens = (diff: Array<DiffMatchPatch.Diff>) => {
    const initialTokens: Array<PartialAnimationToken> = [];
    let id = 0;

    diff.forEach((item) => {
        const characters = item[1].split('');
        const state = item[0];

        characters.forEach((character: string) => {
            initialTokens.push({
                character,
                state,
                id: generateID(),
                opacity: 1,
                transition: 1,
            });
            id++;
        });
    });

    return initialTokens;
};

const calculateInitialAnimationTokens = (
    tokens: Array<PartialAnimationToken>,
    highlightedTokens?: Array<PartialAnimationToken>,
) => {
    const raws: any = [[]];
    let rawIndex = 0;
    let currentPosition = 0;
    let itemIndex = 0;

    tokens.forEach((item: any) => {
        if (item.character !== '\n' && item.state !== 1) {
            const className =
                highlightedTokens &&
                highlightedTokens[itemIndex] &&
                highlightedTokens[itemIndex].class;
            raws[rawIndex].push({
                ...item,
                currentPosition,
                currentRaw: rawIndex,
                ...(className && { class: `token ${className}` }),
            });

            itemIndex++;
            currentPosition++;
        }

        if (item.character === '\n' && item.state !== 1) {
            rawIndex++;
            itemIndex++;
            currentPosition = 0;
            raws.push([]);
        }
    });

    return raws;
};

export const calculateFinalAnimationTokens = (
    tokens: Array<PartialAnimationToken>,
    highlightedTokens?: Array<PartialAnimationToken>,
): TokenizedRaws => {
    const raws: TokenizedRaws = [[]];
    let rawIndex = 0;
    let nextPosition = 0;
    let itemIndex = 0;

    tokens.forEach((item: any) => {
        if (item.character !== '\n' && item.state !== -1) {
            const className =
                highlightedTokens &&
                highlightedTokens[itemIndex] &&
                highlightedTokens[itemIndex].class;

            raws[rawIndex].push({
                ...item,
                nextPosition,
                nextRaw: rawIndex,
                ...(className && { class: `token ${className}` }),
            });

            nextPosition++;
            itemIndex++;
        }

        if (item.character === '\n' && item.state !== -1) {
            rawIndex++;
            nextPosition = 0;
            raws.push([]);
            itemIndex++;
        }
    });

    return raws;
};

export const getData = ({
    oldContent,
    newContent,
    codeHighlight,
    nextPositionTokens,
}: {
    oldContent: string;
    newContent: string;
    codeHighlight?: CodeHighlight;
    nextPositionTokens: TokenizedRaws;
}): {
    initialAnimationTokens: TokenizedRaws;
    finalAnimationTokens: TokenizedRaws;
    isThereMovedItems: boolean;
} => {
    const dmp = new DiffMatchPatch();
    const diff = dmp.diff_main(oldContent, newContent);
    const language = codeHighlight && getLanguage(codeHighlight);

    let oldHighlited;
    let newHighlited;

    if (language) {
        const oldTokenizedHighlight = Prism.tokenize(oldContent, language);

        oldHighlited = letterizeTokens(oldTokenizedHighlight);

        const newTokenizedHighlight = Prism.tokenize(newContent, language);

        newHighlited = letterizeTokens(newTokenizedHighlight);
    }

    const initialTokens = initializeAnimationTokens(diff);

    const isThereMovedItems = initialTokens.some((item) => item.state === 0);

    const initialAnimationTokens = mergeArrays(
        calculateFinalAnimationTokens(initialTokens, newHighlited),
        calculateInitialAnimationTokens(initialTokens, oldHighlited),
    );

    const finalAnimationTokens = calculateFinalAnimationTokens(
        initialTokens,
        newHighlited,
    );

    return { initialAnimationTokens, finalAnimationTokens, isThereMovedItems };
};

type PartialAnimationToken = Partial<AnimationToken>;
