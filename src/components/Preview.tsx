import FakeLine from './FakeLine';

const Preview = ({ preview, unitWidth, unitHeight, fontSize }: any) => {
    return (
        <>
            {preview.map((tokenizedRaw: any, tokenizedRawIndex: number) => (
                <span
                    key={tokenizedRawIndex}
                    style={{ height: unitHeight, display: 'block' }}
                >
                    {tokenizedRaw.length !== 0 ? (
                        tokenizedRaw.map((token: any) => {
                            const { character, class: className, id } = token;
                            return (
                                <span
                                    className={className}
                                    style={{
                                        display: 'inline-block',
                                        fontFamily: 'Monaco, monospace',
                                        fontSize: `${fontSize}px`,
                                        width: unitWidth,
                                        height: unitHeight,
                                        background: 'unset',
                                    }}
                                    key={id}
                                >
                                    {character === ' ' ? '\u00A0' : character}
                                </span>
                            );
                        })
                    ) : (
                        <FakeLine height={unitHeight} />
                    )}
                </span>
            ))}
        </>
    );
};

export default Preview;
