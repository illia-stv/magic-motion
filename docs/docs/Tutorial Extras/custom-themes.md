---
sidebar_position: 1
---

# Custom Themes

Here is an example of how to use **MagicMotion** with [prism-themes](https://github.com/PrismJS/prism-themes)

## Example

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
