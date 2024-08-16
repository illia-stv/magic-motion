import Prism from 'prismjs';

import { CodeHighlight } from '../components/MagicMotion';
import {
    PartialAnimationToken,
    PreviewTokenizedRaws,
    getLanguage,
    letterizeTokens,
} from './utils';

export const getHighlitedPreviewWithRaws = (
    content: Array<PartialAnimationToken>,
) => {
    const raws: PreviewTokenizedRaws = [[]];

    content.forEach((item: PartialAnimationToken, id: number) => {
        if (item.character === '\n') {
            raws.push([]);
            return;
        }

        const character = item.character;

        if (character !== undefined) {
            raws[raws.length - 1].push({
                character: character,
                class: `token ${item.class}`,
                id,
            });
        }
    });

    return raws;
};

export const getPreviewWithRaws = (content: string) => {
    const raws: PreviewTokenizedRaws = [[]];

    content.split('').forEach((character: string, id: number) => {
        if (character === '\n') {
            raws.push([]);
            return;
        }

        if (character !== undefined) {
            raws[raws.length - 1].push({
                character: character,
                id,
            });
        }
    });

    return raws;
};

export const getPreview = ({
    content,
    codeHighlight,
}: {
    content: string;
    codeHighlight?: CodeHighlight;
}): PreviewTokenizedRaws | undefined => {
    const language = codeHighlight && getLanguage(codeHighlight);

    let highlighted;

    if (language) {
        const oldTokenizedHighlight = Prism.tokenize(content, language);

        highlighted = letterizeTokens(oldTokenizedHighlight);

        return getHighlitedPreviewWithRaws(highlighted);
    }

    return getPreviewWithRaws(content);
};
