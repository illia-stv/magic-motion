<p align="center">
<img width="475" alt="Screenshot 2024-08-22 at 20 20 07" src="https://github.com/user-attachments/assets/8328219e-c2aa-41cd-8fdf-fa7352009b80">
  <br/>
  <br/>
</p>


<p align="center">
    <a href="https://github.com/illia-stv/magic-motion/actions"><img alt="Build" src="https://img.shields.io/badge/passsed-green?label=build"</a>
    <a href="https://github.com/illia-stv/magic-motion/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/badge/MIT-blue?style=flat&label=license"></a>
    <a href="https://illia-stv.github.io/magic-motion/docs/intro"><img alt="Documentation" src="https://img.shields.io/badge/online-green?label=website"></a>
    <a href="https://github.com/illia-stv/magic-motion/releases"><img alt="GitHub release" src="https://img.shields.io/badge/v1.0.13-blue?label=release"></a>
    <a href="https://www.npmjs.com/package/magic-motion"><img alt="GitHub release" src="https://img.shields.io/badge/npm-red?label=package"></a>
</p>

MagicMotion is a powerful and flexible code animation library that allows developers to easily create dynamic code animations. Whether you're building educational tools, showcasing code snippets, or creating interactive tutorials, MagicMotion makes it easy to animate code transitions with smooth and customizable effects.

https://github.com/user-attachments/assets/9180821b-f85b-47be-8577-a482172a5e12

## Installation

You can install MagicMotion via npm or yarn:

```bash
npm install magic-motion
```

Or with yarn:

```bash
yarn add magic-motion
```

## Example with plain text

To use MagicMotion, simply import the library and pass the initial content to the `MagicMotion` component.
On button click lets assign handler which will update the value of content which we want animate to. Component
animates whenever the value of `animateTo` is changing.

> **Note:** To prevent undesired behaviour, update the value of `animateTo` only when animation is finished.
> You could use `onAnimationFinished` callback to verify when animation is finished.

```jsx
import { MagicMotion } from 'magic-motion';

const App = () => {
    const [animateTo, setAnimateTo] = useState();

    const buttonHandler = () => {
        setAnimateTo('Hello my friends');
    };

    return (
        <>
            <MagicMotion
                initialContent="Hello World!!!"
                animateTo={animateTo}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```

## Example with code

`MagicMotion` useses [prismjs](https://prismjs.com/) underhood for code highlighting, so you could use any theme provided by `prismjs`. Here is example [list of themes](https://github.com/PrismJS/prism-themes/tree/master/themes) which could be used.

So lets install these themes.

```bash
npm install prism-themes
```

Or with yarn:

```bash
yarn add prism-themes
```

Import styles.

```jsx
import { MagicMotion } from 'magic-motion';
import 'prism-themes/themes/prism-one-dark.css';

const App = () => {
    const [animateTo, setAnimateTo] = useState();

    const buttonHandler = () => {
        setAnimateTo('const sum = (a, b) => a + b;');
    };

    return (
        <>
            <MagicMotion
                initialContent="const value = 5;"
                animateTo={animateTo}
                codeHighlight={{
                    languageName: 'javascript',
                }}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```

Don't forget to define the `languageName` (e.g. javascript, css, html).

## Configuration Options

### MagicMotionConfig

The `MagicMotionConfig` interface provides a range of options to customize your code animations. Here's a breakdown of each property:

| Property              | Type                                           | Description                                                                                                    |
|-----------------------|------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `initialContent`      | `string`, required                             | The initial code content to be displayed.                                                                      |
| `animateTo`           | `string`, optional                             | The target code content to animate to. If not provided, only the initial content will be displayed.            |
| `duration`            | `very slow`, `slow`, `normal`, `fast`, `very fast`, `number`, optional | The duration of the animation. Specify the duration in seconds or milliseconds.                             |
| `variant`             | `move later`, `move instantly`, optional      | The animation variant or style. Customize the transition effect between the initial and target content.        |
| `styles`              | `any`, optional                                | Custom CSS styles to apply to the animated code content.                                                       |
| `fontSize`            | `number`, optional                             | Set the font size of the code content.                                                                         |
| `codeHighlight`       | `CodeHighlight`, optional                      | Define syntax highlighting options for the code content.                                                       |
| `children`            | `JSX.Element`, optional                        | Pass additional JSX elements to be rendered alongside the animated content.                                    |
| `onAnimationFinished` | `function`, optional                           | A callback function triggered when the animation finishes.                                                     |
| `onAnimationStart`    | `function`, optional                           | A callback function triggered when the animation starts.                                                       |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue if you have any ideas, improvements, or bugs to report.

## License

MagicMotion is licensed under the MIT License. See the LICENSE file for more information.

---

This README provides a comprehensive overview of your library, including installation, usage, configuration options, and examples. You can further enhance it by adding more detailed documentation, links to live demos, or badges for things like build status or npm version.
