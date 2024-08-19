---
sidebar_position: 4
---

# Styles

`Styles` property allows you to apply custom styles to the `MagicMotion` component.

## Example

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
                styles={{
                    background: '#111',
                    color: '#aaa',
                }}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```
