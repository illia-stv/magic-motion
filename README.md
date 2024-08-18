# MagicMotion

MagicMotion is a powerful and flexible code animation library that allows developers to easily create dynamic code animations. Whether you're building educational tools, showcasing code snippets, or creating interactive tutorials, MagicMotion makes it easy to animate code transitions with smooth and customizable effects.

## Installation

You can install MagicMotion via npm or yarn:

```bash
npm install magic-motion
```

Or with yarn:

```bash
yarn add magic-motion
```

## Usage

To use MagicMotion, simply import the library and pass the desired configuration options to the `MagicMotion` component.

```jsx
import { MagicMotion } from 'magic-motion';

const App = () => {
    return (
        <MagicMotion
            initialContent="console.log('Hello, World!');"
            animateTo="console.log('Hello, MagicMotion!');"
            duration="normal"
            variant="move instantly"
            onAnimationStart={() => console.log('Animation started!')}
            onAnimationFinished={() => console.log('Animation finished!')}
        />
    );
};

export default App;
```

## Configuration Options

### MagicMotionConfig

-   The `MagicMotionConfig` interface provides a range of options to customize your code animations. Here's a breakdown of each property:

-   `initialContent` (string, required):
    The initial code content to be displayed.

-   `animateTo` (string, optional):
    The target code content to animate to. If not provided, only the initial content will be displayed.

-   `duration` (`very slow' | 'slow' | 'normal' | 'fast' | 'very fast' | number``, optional):
    The duration of the animation. Specify the duration in seconds or milliseconds.

-   `variant` (`move later`|`move instantly`, optional):
    The animation variant or style. Customize the transition effect between the initial and target content.

-   `styles` (any, optional):
    Custom CSS styles to apply to the animated code content.

-   `fontSize` (number, optional):
    Set the font size of the code content.

-   `codeHighlight` (CodeHighlight, optional):
    Define syntax highlighting options for the code content.

-   `children` (JSX.Element, optional):
    Pass additional JSX elements to be rendered alongside the animated content.

-   `onAnimationFinished` (function, optional):
    A callback function triggered when the animation finishes.

-   `onAnimationStart` (function, optional):
    A callback function triggered when the animation starts.

## Examples

Here are a few examples of how you can use MagicMotion:

### Simple Code Transition

```jsx
<MagicMotion
    initialContent="const x = 10;"
    animateTo="const y = 20;"
    duration="slow"
    variant="slide"
/>
```

### Simple Code Transition

```jsx
<MagicMotion
    initialContent="function greet() { return 'Hello'; }"
    animateTo="function greet() { return 'Hello, MagicMotion!'; }"
    duration="fast"
    variant="move instantly"
    fontSize={16}
    codeHighlight={{ language: 'javascript' }}
/>
```

## API

### `Duration`

-   seconds (number): The duration of the animation in seconds.
-   milliseconds (number): The duration of the animation in milliseconds.

### `Variant`

-   move later: Moving animation is starting after removing animation.
-   move instantly: Moving animation is starting with removing animation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue if you have any ideas, improvements, or bugs to report.

## License

MagicMotion is licensed under the MIT License. See the LICENSE file for more information.

---

This README provides a comprehensive overview of your library, including installation, usage, configuration options, and examples. You can further enhance it by adding more detailed documentation, links to live demos, or badges for things like build status or npm version.
