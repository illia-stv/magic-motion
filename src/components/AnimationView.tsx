import FakeLine from './FakeLine';
import type {
    AnimationToken,
    TokenizedRaw,
    TokenizedRaws,
} from './MagicMotion';

const AnimationView = ({
    tokenizedRaws,
    animationState,
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
        console.log(el?.getAnimations());
        if (el && state === -1 && animationState === 'REMOVE') {
            setTimeout(() => (el.style.opacity = '0'), 50);
        }

        if (
            el &&
            state === 0 &&
            x !== undefined &&
            y !== undefined &&
            animationState === 'MOVE'
        ) {
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }

        if (el && state === 1 && animationState === 'ADD') {
            setTimeout(() => (el.style.opacity = '1'), 50);
        }
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
                            tokenizedRaw.map(
                                (token: AnimationToken, index: number) => {
                                    const {
                                        x,
                                        y,
                                        opacity,
                                        transition,
                                        character,
                                        state,
                                        id,
                                    } = token;
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
                                                opacity,
                                                width: unitWidth,
                                                height: unitHeight,
                                                ...(isMoved && {
                                                    transform: `translateX(${x}px) translateY(${y}px)`,
                                                }),
                                                transition: `${transition}s`,
                                            }}
                                            key={id}
                                        >
                                            {character === ' '
                                                ? '\u00A0'
                                                : character}
                                        </span>
                                    );
                                },
                            )
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
