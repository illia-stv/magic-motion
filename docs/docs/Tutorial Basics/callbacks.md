---
sidebar_position: 6
---

# Callbacks

In **MagicMotion**, callbacks are very important as they notify us when an animation has started and finished. This is crucial because we highly recommend not updating the state of the `animateTo` property until the animation has finished.

## `onAnimationStart`

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
                onAnimationStart={() => console.log('Animation started!')}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```

## `onAnimationFinished`

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
                onAnimationFinished={() => console.log('Animation finished!')}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};
```
