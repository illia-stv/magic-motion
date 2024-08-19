---
sidebar_position: 2
---

# Variants

**MagicMotion** uses three main actions in its animations:

-   removing content
-   moving content
-   adding content

These actions can be combined to create seamless transitions. There are two variants: `move later` and `move instantly`.

## `move later`

`move later` it is a default value of the `variant` property. The animation is splits into three phases, so removing action is first, moving is second and adding is third.

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
                initialContent="Hello world!!!"
                animateTo={animateTo}
                variant="move later"
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```

## `move instantly`

`move instantly` has only two phases: the moving and removing actions occur simultaneously, followed by the adding animation.

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
                initialContent="Hello world!!!"
                animateTo={animateTo}
                variant="move instantly"
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```
