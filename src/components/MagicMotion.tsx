import { useEffect, useState, useRef } from 'react';
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
    const animationDuration = extractDurationValue(duration, variant);
    const timerIds = useRef<Array<number>>([]);
    const {
        unitWidth,
        unitHeight,
        fontSize: fontSizeValue,
    } = calculateDimensions(fontSize);

    const clearTimeouts = () => {
        if (timerIds.current.length) {
            timerIds.current.forEach((id) => {
                clearTimeout(id);
            });
            timerIds.current = [];
        }
    };

    useEffect(() => {
        if (animationState !== 'NOT_ANIMATED') {
            clearTimeouts();
            setAnimationState('INTERRUPTED');

            return;
        }

        if (animateTo !== undefined) {
            init();
        }
    }, [animateTo]);

    const init = () => {
        setPreview(undefined);
        processData();
        setAnimationState('REMOVE');

        if (onAnimationStart) {
            onAnimationStart(true);
        }
    };

    useEffect(() => {
        if (animationState !== 'NOT_ANIMATED') {
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
                nextPositionTokens,
            });

            setIsThereMovedItems(isThereMovedItems);
            setNextPositionTokens(finalAnimationTokens);
            setTokenizedRaws(initialAnimationTokens);
        }
    };

    useEffect(() => {
        orchestrateAnimation(animationState, variant);

        if (animationState === 'NOT_ANIMATED') {
            setLastAnimatedContent(animateTo);

            if (onAnimationFinished) {
                onAnimationFinished(false);
            }
        }
    }, [animationState]);

    const orchestrateAnimation = (animationState: string, variant?: string) => {
        if (animationState === 'INTERRUPTED') {
            init();
            return;
        }

        if (variant === undefined || variant === 'move later') {
            if (animationState === 'REMOVE') {
                const id = remove({
                    nextState: isThereMovedItems ? 'MOVE' : 'ADD',
                });

                if (id !== undefined) {
                    timerIds.current.push(id);
                }
            }

            if (animationState === 'MOVE') {
                const id = move({ nextState: 'ADD' });

                if (id !== undefined) {
                    timerIds.current.push(id);
                }
            }

            if (animationState === 'ADD') {
                const id = add({ nextState: 'NOT_ANIMATED' });

                if (id !== undefined) {
                    timerIds.current.push(id);
                }
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
                add({ nextState: 'NOT_ANIMATED' });
            }
        }
    };

    const actionWrapper = (callback: any) => {
        return (props?: { nextState?: AnimationState }) => {
            callback();

            const nextState = props && props.nextState;
            const animationDurationInMilliseconds = animationDuration * 1000;

            if (nextState) {
                const id = setTimeout(() => {
                    setAnimationState(nextState);
                }, animationDurationInMilliseconds);

                return id;
            }
        };
    };

    const remove = actionWrapper(() => {
        const updatedTokenizedRaws = Array.from(tokenizedRaws);

        updatedTokenizedRaws.forEach((raw) => {
            raw.forEach((token) => {
                if (token.state === -1) {
                    token.opacity = 1;
                    token.transition = animationDuration;
                }

                if (token.state === 0) {
                    token.opacity = 1;
                    token.transition = 0;
                }

                if (token.state === 1) {
                    token.opacity = 0;
                    token.transition = 0;
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

                    if (token.state === -1) {
                        token.opacity = 0;
                    }

                    if (token.state === 0) {
                        token.transition = animationDuration;
                        token.x = x;
                        token.y = y;
                    }

                    if (token.state === 1) {
                        token.opacity = 0;
                    }
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
                    token.transition = animationDuration;
                    token.opacity = 0;
                }

                if (token.state === 0) {
                    token.transition = 0;
                    token.x = 0;
                    token.y = 0;
                }

                if (token.state === -1) {
                    token.opacity = 0;
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
                    languageName={codeHighlight && codeHighlight.languageName}
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
    transition?: number;
    nextPosition?: number;
    currentPosition: number;
    nextRaw: number;
    currentRaw: number;
    state: number;
    id: string;
    class?: string;
};

type AnimationState =
    | 'NOT_ANIMATED'
    | 'REMOVE'
    | 'MOVE'
    | 'ADD'
    | 'INTERRUPTED';
export type DurationValues = {
    milliseconds?: number;
    seconds?: number;
};
export type Duration =
    | 'very slow'
    | 'slow'
    | 'normal'
    | 'fast'
    | 'very fast'
    | DurationValues;
export type Variant = 'move later' | 'move instantly';
export type CodeHighlight = {
    languageName?: string;
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
    onAnimationFinished?: (arg: false) => void;
    onAnimationStart?: (arg: true) => void;
}

export default MagicMotion;
