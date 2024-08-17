import Prism from 'prismjs';
import {
    CodeHighlight,
    Duration,
    AnimationToken,
    TokenizedRaws,
    DurationValues,
    Variant,
} from '../components/MagicMotion';
import {
    BIG_SCREEN_FONT_SIZE,
    DEFAUL_DURATION,
    FAST_DURATION,
    FONT_SIZE_HEIGHT_RATIO,
    FONT_SIZE_WIDTH_RATIO,
    NORMAL_SCREEN_FONT_SIZE,
    SLOW_DURATION,
    SMALL_SCREEN_FONT_SIZE,
    VERY_FAST_DURATION,
    VERY_SLOW_DURATION,
    VERY_SMALL_SCREEN_FONT_SIZE,
} from './constants';

export const calculateFontSize = () => {
    if (!window) {
        return NORMAL_SCREEN_FONT_SIZE;
    }

    const viewportWidth = window.innerWidth;

    if (viewportWidth < 400) {
        return VERY_SMALL_SCREEN_FONT_SIZE;
    }

    if (viewportWidth < 600) {
        return SMALL_SCREEN_FONT_SIZE;
    }

    if (viewportWidth < 1200) {
        return NORMAL_SCREEN_FONT_SIZE;
    }

    return BIG_SCREEN_FONT_SIZE;
};

export const calculateDimensions = (fontSize?: number) => {
    const fontSizeValue = fontSize || calculateFontSize();
    const unitWidth =
        Math.round(fontSizeValue * FONT_SIZE_WIDTH_RATIO * 10) / 10;
    const unitHeight =
        Math.round(fontSizeValue * FONT_SIZE_HEIGHT_RATIO * 10) / 10;

    return {
        unitWidth,
        unitHeight,
        fontSize: fontSizeValue,
    };
};

export const mergeArrays = (arr1: TokenizedRaws, arr2: TokenizedRaws) => {
    const flatArr1 = arr1.flat();

    return arr2.map((innerArray) =>
        innerArray.map((item) => {
            const foundItem = flatArr1.find((token) => token.id === item.id);
            return foundItem
                ? {
                      ...item,
                      nextPosition: foundItem.nextPosition,
                      nextRaw: foundItem.nextRaw,
                  }
                : item;
        }),
    );
};

export const positionToCoordinate = (
    column: number,
    raw: number,
    token: AnimationToken,
    unitHeight: number,
    unitWidth: number,
) => {
    return {
        x: (column - token.currentPosition) * unitWidth,
        y: (raw - token.currentRaw) * unitHeight,
    };
};

export const getLanguage = (codeHighlight: CodeHighlight) => {
    if (codeHighlight && codeHighlight.customLanguage) {
        return codeHighlight.customLanguage;
    }

    if (codeHighlight && typeof codeHighlight.languageName === 'string') {
        return Prism.languages[codeHighlight.languageName];
    }

    if (typeof codeHighlight === 'string') {
        return Prism.languages[codeHighlight];
    }
};

export const extractDurationValue = (
    duration?: Duration,
    variant?: Variant,
) => {
    const phases = variant === 'move instantly' ? 2 : 3;

    const normalizeDuration = (value: number) => {
        return value / phases;
    };

    const seconds = duration && (duration as DurationValues).seconds;

    if (seconds !== undefined) {
        return normalizeDuration(seconds);
    }

    const milliseconds = duration && (duration as DurationValues).milliseconds;

    if (seconds !== milliseconds) {
        return normalizeDuration(milliseconds / 1000);
    }

    if (duration === 'very slow') {
        return normalizeDuration(VERY_SLOW_DURATION);
    }

    if (duration === 'slow') {
        return normalizeDuration(SLOW_DURATION);
    }

    if (duration === 'normal') {
        return normalizeDuration(DEFAUL_DURATION);
    }

    if (duration === 'fast') {
        return normalizeDuration(FAST_DURATION);
    }

    if (duration === 'very fast') {
        return normalizeDuration(VERY_FAST_DURATION);
    }

    return normalizeDuration(DEFAUL_DURATION);
};

export const letterizeTokens = (
    tokens: Array<string | Prism.Token>,
): Array<PartialAnimationToken> => {
    const newTokens: Array<PartialAnimationToken> = [];

    const processItem = (item: string | Prism.Token) => {
        if (typeof item === 'string') {
            item.split('').forEach((character: string) => {
                newTokens.push({ character });
            });
        } else if (typeof item === 'object') {
            if (Array.isArray(item.content)) {
                item.content.forEach(processItem);
            } else {
                (item.content as string)
                    .split('')
                    .forEach((character: string) => {
                        newTokens.push({ character, class: item.type });
                    });
            }
        }
    };

    tokens.forEach(processItem);

    return newTokens;
};

export type PartialAnimationToken = Partial<AnimationToken>;

export type PreviewToken = {
    character: string;
    id: number;
    class?: string;
};
export type PreviewTokenizedRaw = Array<PreviewToken>;

export type PreviewTokenizedRaws = Array<PreviewTokenizedRaw>;
