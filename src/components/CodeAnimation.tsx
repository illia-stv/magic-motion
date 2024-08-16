import { PreviewTokenizedRaws } from '../utils/utils';
import AnimationView, { AnimationViewProps } from './AnimationView';
import Preview from './Preview';

const CodeAnimation = ({
    tokenizedRaws,
    animationState,
    animationDuration,
    unitWidth,
    unitHeight,
    fontSize,
    styles,
    preview,
}: AnimationViewProps & {
    styles: any;
    preview: PreviewTokenizedRaws | undefined;
}) => {
    return (
        <pre
            style={{
                overflow: 'auto',
                ...styles,
            }}
        >
            <code>
                {preview ? (
                    <Preview
                        unitWidth={unitWidth}
                        unitHeight={unitHeight}
                        fontSize={fontSize}
                        preview={preview}
                    />
                ) : (
                    <AnimationView
                        tokenizedRaws={tokenizedRaws}
                        animationState={animationState}
                        animationDuration={animationDuration}
                        unitWidth={unitWidth}
                        unitHeight={unitHeight}
                        fontSize={fontSize}
                    />
                )}
            </code>
        </pre>
    );
};

export default CodeAnimation;
