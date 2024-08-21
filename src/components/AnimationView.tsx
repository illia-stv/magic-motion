'use client';
import FakeLine from './FakeLine';
import type {
    AnimationToken,
    TokenizedRaw,
    TokenizedRaws,
} from './MagicMotion';

const AnimationView = ({
    tokenizedRaws,
    animationState,
    animationDuration,
    unitWidth,
    unitHeight,
    fontSize,
}: AnimationViewProps) => {
    const handleRef = (
        el: HTMLSpanElement | null,
        x: number,
        y: number,
        state: number,
    ) => {
        if (el && state === -1 && animationState === 'REMOVE') {
            fadeOut(el, animationDuration);
        }

        if (
            el &&
            state === 0 &&
            x !== undefined &&
            y !== undefined &&
            animationState === 'MOVE'
        ) {
            el.style.transition = `${animationDuration}s`;
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }

        if (el && state === 1 && animationState === 'ADD') {
            fadeIn(el, animationDuration);
        }
    };

    const fadeOut = (element: HTMLSpanElement, duration: number) => {
        let opacity = 1;
        const interval = 1 / 60;
        const decrement = interval / (duration * 0.5);

        function updateOpacity() {
            if (element) {
                opacity -= decrement;
                if (opacity <= 0) {
                    opacity = 0;
                    element.style.opacity = `${opacity}`;
                } else {
                    element.style.opacity = `${opacity}`;
                    requestAnimationFrame(updateOpacity);
                }
            }
        }

        requestAnimationFrame(updateOpacity);
    };

    const fadeIn = (element: HTMLSpanElement, duration: number) => {
        let opacity = 0;
        const interval = 1 / 60;
        const decrement = interval / (duration * 0.5);

        function updateOpacity() {
            if (element) {
                opacity += decrement;
                if (opacity >= 1) {
                    opacity = 1;
                    element.style.opacity = `${opacity}`;
                } else {
                    element.style.opacity = `${opacity}`;
                    requestAnimationFrame(updateOpacity);
                }
            }
        }

        requestAnimationFrame(updateOpacity);
    };

    return (
        <>
            {tokenizedRaws.map(
                (tokenizedRaw: TokenizedRaw, tokenizedRawIndex: number) => (
                    <span
                        key={tokenizedRawIndex}
                        style={{ height: unitHeight, display: 'block' }}
                    >
                        {tokenizedRaw.length !== 0 ? (
                            tokenizedRaw.map((token: AnimationToken) => {
                                const { x, y, opacity, character, state, id } =
                                    token;
                                const isMoved =
                                    animationState === 'ADD' && state === 0;

                                return (
                                    <span
                                        ref={(el) =>
                                            handleRef(
                                                el,
                                                x as number,
                                                y as number,
                                                state,
                                            )
                                        }
                                        className={token.class}
                                        style={{
                                            display: 'inline-block',
                                            fontFamily: 'Monaco, monospace',
                                            fontSize: `${fontSize}px`,
                                            width: unitWidth,
                                            height: unitHeight,
                                            ...(isMoved && {
                                                transform: `translateX(${x}px) translateY(${y}px)`,
                                                transition: '0s',
                                            }),
                                            ...(animationState ===
                                                'INTERRUPTED' && {
                                                transition: '0s',
                                                opacity,
                                                transform: `translateX(${x}px) translateY(${y}px)`,
                                            }),
                                            background: 'unset',
                                        }}
                                        key={id}
                                    >
                                        {character === ' '
                                            ? '\u00A0'
                                            : character}
                                    </span>
                                );
                            })
                        ) : (
                            <FakeLine height={unitHeight} />
                        )}
                    </span>
                ),
            )}
        </>
    );
};

export default AnimationView;

export type AnimationViewProps = {
    tokenizedRaws: TokenizedRaws;
    animationState: string;
    animationDuration: number;
    unitWidth: number;
    unitHeight: number;
    fontSize: number;
    languageName?: string;
};
