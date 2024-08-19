---
sidebar_position: 5
---

# Code Hilghliting

One of the primary features of **MagicMotion** is a code highlighting, powered by [prismjs](https://prismjs.com/).

## Example

To use code highlighting, you'll need to install [prismjs](https://prismjs.com/). You can choose any theme you like, or you can use [prism-themes](https://github.com/PrismJS/prism-themes), which offers a wider selection of themes. All you need to do is import the styles and define the language used in the code snippet. In our case, it's `javascript`.

```jsx
import { MagicMotion } from 'magic-motion';
import 'prismjs/themes/prism.css';

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

## Specify the language

If the language you are using one of the following:

-   Markup - `markup`, `html`, `xml`, `svg`, `mathml`, `ssml`, `atom`, `rss`
-   CSS - `css`
-   C-like - `clike`
-   JavaScript - `javascript`, `js`

You don't need to import any additional modules from `Prism.js`. However, if you're using a language other than those listed above, your code should look like this:

```jsx
import { MagicMotion } from 'magic-motion';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-git.js';

const App = () => {
    const [animateTo, setAnimateTo] = useState();

    const buttonHandler = () => {
        setAnimateTo('git rebase');
    };

    return (
        <>
            <MagicMotion
                initialContent="git commit -m 'My commit.'"
                animateTo={animateTo}
                codeHighlight={{
                    languageName: 'git',
                }}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```

In the example above, we are using the `git` language, which needs to be imported from `Prism.js`. You can find a list of all supported languages [here](https://prismjs.com/#supported-languages).
