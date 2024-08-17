import { useEffect, useState } from 'react';
import { type Grammar } from 'prismjs';
import CodeAnimation from './CodeAnimation';
import PlainTextAnimation from './PlainTextAnimation';
import {
    PreviewTokenizedRaws,
    calculateDimensions,
    extractDurationValue,
    positionToCoordinate,
} from '../utils/utils';
import { getPreview } from '../utils/getPreview';
import { getData } from '../utils/getData';

export type Duration =
    | 'very slow'
    | 'slow'
    | 'normal'
    | 'fast'
    | 'very fast'
    | number;
export type Variant = 'move later' | 'move instantly';
export type CodeHighlight = {
    languageName?: string;
    customLanguage?: Grammar;
};

export interface MagicMotionConfig {
    initialContent: string;
    animateTo?: string;
    duration?: Duration;
    variant?: Variant;
    styles?: any;
    fontSize?: number;
    codeHighlight?: CodeHighlight;
    children?: JSX.Element;
    onAnimationFinished: (arg: false) => void;
    onAnimationStart: (arg: true) => void;
}

const MagicMotion = ({
    initialContent,
    animateTo,
    duration,
    variant,
    styles,
    fontSize,
    codeHighlight,
    children,
    onAnimationStart,
    onAnimationFinished,
}: MagicMotionConfig) => {
    const [animationState, setAnimationState] =
        useState<AnimationState>('NOT_ANIMATED');
    const [nextPositionTokens, setNextPositionTokens] = useState<TokenizedRaws>(
        [],
    );
    const [lastAnimatedContent, setLastAnimatedContent] = useState<
        string | undefined
    >();
    const [isThereMovedItems, setIsThereMovedItems] = useState(true);
    const [tokenizedRaws, setTokenizedRaws] = useState<TokenizedRaws>([]);
    const [preview, setPreview] = useState<PreviewTokenizedRaws | undefined>();
    const animationDuration = extractDurationValue(duration);
    const {
        unitWidth,
        unitHeight,
        fontSize: fontSizeValue,
    } = calculateDimensions(fontSize);

    useEffect(() => {
        if (animateTo !== undefined) {
            setPreview(undefined);
            processData();
            onAnimationStart(true);
            setAnimationState('REMOVE');
        }
    }, [animateTo]);

    useEffect(() => {
        if (
            animationState !== 'NOT_ANIMATED' &&
            animationState !== 'ANIMATION_FINISHED'
        ) {
            return;
        }

        if (initialContent === undefined) {
            console.error(
                '`initialContent` property should be defined in MagicMotion component.',
            );

            return;
        }

        if (animateTo === undefined) {
            setPreview(getPreview({ content: initialContent, codeHighlight }));

            return;
        }

        processData();
    }, []);

    const processData = () => {
        const oldContent = lastAnimatedContent || initialContent;

        if (oldContent !== undefined && animateTo !== undefined) {
            const {
                initialAnimationTokens,
                finalAnimationTokens,
                isThereMovedItems,
            } = getData({
                oldContent,
                newContent: animateTo,
                codeHighlight,
            });

            setIsThereMovedItems(isThereMovedItems);
            setNextPositionTokens(finalAnimationTokens);
            setTokenizedRaws(initialAnimationTokens);
        }
    };

    useEffect(() => {
        orchestrateAnimation(animationState, variant);

        if (animationState === 'ANIMATION_FINISHED') {
            setLastAnimatedContent(animateTo);
            onAnimationFinished(false);
        }
    }, [animationState]);

    const orchestrateAnimation = (animationState: string, variant?: string) => {
        if (variant === undefined || variant === 'move later') {
            if (animationState === 'REMOVE') {
                remove({ nextState: isThereMovedItems ? 'MOVE' : 'ADD' });
            }

            if (animationState === 'MOVE') {
                move({ nextState: 'ADD' });
            }

            if (animationState === 'ADD') {
                add({ nextState: 'ANIMATION_FINISHED' });
            }
        }

        if (variant === 'move instantly') {
            if (animationState === 'REMOVE') {
                remove({ nextState: 'ADD' });
                if (isThereMovedItems) {
                    move();
                }
            }

            if (animationState === 'ADD') {
                add({ nextState: 'ANIMATION_FINISHED' });
            }
        }
    };

    const actionWrapper = (callback: any) => {
        return (props?: { nextState?: AnimationState }) => {
            callback();

            const nextState = props && props.nextState;

            if (nextState) {
                setTimeout(() => {
                    setAnimationState(nextState);
                }, animationDuration);
            }
        };
    };

    const remove = actionWrapper(() => {
        const updatedTokenizedRaws = Array.from(tokenizedRaws);

        updatedTokenizedRaws.forEach((raw) => {
            raw.forEach((token) => {
                if (token.state === -1) {
                    token.opacity = 0;
                }
            });
        });

        setTokenizedRaws(updatedTokenizedRaws);
    });

    const move = actionWrapper(() => {
        const updatedTokenizedRaws: any = Array.from(tokenizedRaws);

        updatedTokenizedRaws.forEach((raw: any) => {
            raw.forEach((token: AnimationToken) => {
                if (token.nextPosition !== undefined) {
                    const { x, y } = positionToCoordinate(
                        token.nextPosition,
                        token.nextRaw,
                        token,
                        unitHeight,
                        unitWidth,
                    );

                    token.x = x;
                    token.y = y;
                }
            });
        });

        setTokenizedRaws(updatedTokenizedRaws);
    });

    const add = actionWrapper(() => {
        const updatedTokenizedRaws: any = Array.from(nextPositionTokens);

        updatedTokenizedRaws.forEach((raw: any) => {
            raw.forEach((token: AnimationToken) => {
                if (token.state === 1) {
                    token.opacity = 1;
                }
            });
        });

        setTokenizedRaws(updatedTokenizedRaws);
    });

    return (
        <div className="magic-motion">
            {codeHighlight === undefined ? (
                <PlainTextAnimation
                    tokenizedRaws={tokenizedRaws}
                    animationState={animationState}
                    animationDuration={animationDuration}
                    unitWidth={unitWidth}
                    unitHeight={unitHeight}
                    fontSize={fontSizeValue}
                    styles={styles}
                    preview={preview}
                />
            ) : (
                <CodeAnimation
                    tokenizedRaws={tokenizedRaws}
                    animationState={animationState}
                    animationDuration={animationDuration}
                    unitWidth={unitWidth}
                    unitHeight={unitHeight}
                    fontSize={fontSizeValue}
                    styles={styles}
                    preview={preview}
                />
            )}
            {children}
        </div>
    );
};

export type TokenizedRaws = Array<TokenizedRaw>;
export type TokenizedRaw = Array<AnimationToken>;
export type AnimationToken = {
    character: string;
    x?: number | string;
    y?: number | string;
    opacity?: number;
    nextPosition?: number;
    currentPosition: number;
    nextRaw: number;
    currentRaw: number;
    state: number;
    id: number;
    class?: string;
};

type AnimationState =
    | 'NOT_ANIMATED'
    | 'REMOVE'
    | 'MOVE'
    | 'ADD'
    | 'ANIMATION_FINISHED';

export default MagicMotion;
