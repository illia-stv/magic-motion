import { motion } from 'framer-motion';
import FakeLine from './FakeLine';
import type { TokenizedRaw, TokenizedRaws } from './MagicMotion';

const AnimationView = ({
    tokenizedRaws,
    animationState,
    animationDuration,
    unitWidth,
    unitHeight,
    fontSize,
}: AnimationViewProps) => {
    return (
        <>
            {tokenizedRaws.map(
                (tokenizedRaw: TokenizedRaw, tokenizedRawIndex: number) => (
                    <span
                        key={tokenizedRawIndex}
                        style={{ height: unitHeight, display: 'block' }}
                    >
                        {tokenizedRaw.length !== 0 ? (
                            tokenizedRaw.map((token: any) => {
                                const { x, y, opacity, character, state, id } =
                                    token;
                                const isAdded = state === 1;
                                const isMoved =
                                    animationState === 'ADD' && state === 0;

                                return (
                                    <motion.span
                                        animate={{ x, y, opacity }}
                                        className={token.class}
                                        initial={isAdded && { opacity: 0 }}
                                        style={{
                                            display: 'inline-block',
                                            fontFamily: 'Monaco, monospace',
                                            fontSize: `${fontSize}px`,
                                            width: unitWidth,
                                            height: unitHeight,
                                            x: isMoved ? x : undefined,
                                            y: isMoved ? y : undefined,
                                            background: 'unset',
                                        }}
                                        transition={{
                                            duration: animationDuration,
                                        }}
                                        key={id}
                                    >
                                        {character === ' '
                                            ? '\u00A0'
                                            : character}
                                    </motion.span>
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
