---
sidebar_position: 1
---

# Duration

**MagicMotion** allows you to manipulate the duration of the animation. You can set the `duration` value by using one of the following `string` values:

-   `very slow` (5 seconds)
-   `slow` (4 seconds)
-   `normal` (3 seconds)
-   `fast` (2 seconds)
-   `very fast` (1 seconds)

```jsx
import { MagicMotion } from 'magic-motion';

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
                duration="fast"
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```

## Custom duration

You could set a custom value of animation's duration.

In seconds:

```jsx
<MagicMotion
    initialContent="Hello world"
    animateTo={animateTo}
    duration={{
        seconds: 1.5,
    }}
/>
```

In milliseconds:

```jsx
<MagicMotion
    initialContent="Hello world"
    animateTo={animateTo}
    duration={{
        milliseconds: 1750,
    }}
/>
```
