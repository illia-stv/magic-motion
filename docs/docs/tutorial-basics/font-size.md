---
sidebar_position: 3
---

# Font Size

Sometimes, you might need to change the font size of the content inside MagicMotion, such as for responsive design purposes. For this, use the fontSize property.

## `fontSize`

```jsx
import { MagicMotion } from 'magic-motion';

const App = () => {
    const [animateTo, setAnimateTo] = useState();

    const buttonHandler = () => {
        setAnimateTo('Hello my friend');
    };

    return (
        <>
            <MagicMotion
                initialContent="Hello world!!!"
                animateTo={animateTo}
                fontSize={17}
            />
            <button onClick={buttonHandler}>Animate</button>
        </>
    );
};

export default App;
```
