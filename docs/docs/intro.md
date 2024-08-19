---
sidebar_position: 1
---

import ReactPlayer from 'react-player'

# Tutorial Intro

Discover **Magic Motion** in less than 5 minutes.

<ReactPlayer playing controls url="../video/demo.mp4" />

## Getting Started

Begin by downloading the package.

With npm:

```bash
npm install magic-motion
```

With yarn:

```bash
yarn add magic-motion
```

### What you'll need

-   [React](https://react.dev//) version 16 or above:

## Import dependencies

To use **Magic Motion** you must import it:

```jsx
import { MagicMotion } from 'magic-motion';
```

## Content initialization

By providing a string to the `initialContent`` property, you define the initial state of the `MagicMotion` component:

```jsx
const App = () => {
    return <MagicMotion initialContent="Hello World!!!" />;
};

export default App;
```

## Animate content

The final step is to provide the content that will be animated. Let's create a hook and update its value by clicking the button:

```jsx
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
```

Congratulations! You just created your first animation with **Magic Motion**.
