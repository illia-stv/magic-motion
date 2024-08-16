import { PreviewTokenizedRaws } from '../utils/utils';
import AnimationView, { AnimationViewProps } from './AnimationView';
import Preview from './Preview';

const PlainTextAnimation = ({
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
        <p
            style={{
                overflow: 'auto',
                ...styles,
            }}
        >
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
        </p>
    );
};

export default PlainTextAnimation;
