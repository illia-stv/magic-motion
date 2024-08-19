---
sidebar_position: 2
---

# Usage

Remember not to update the state of the `animateTo` property until the animation has finished.

## Example

```jsx
import { MagicMotion } from "magic-motion";
import "prismjs/themes/prism.css";
import { useState } from "react";

const contents = [
  'const sum = (a, b) => a + b;',
  `const sum = (a, b) => {
  return a + b;
}`,
  `function sum(a, b) {
  return a + b;
}`,
];

const App = () => {
  const [animateTo, setAnimateTo] = useState<string | undefined>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [counter, setCounter] = useState(0);

  const handler = () => {
    if (!isAnimating) {
      setAnimateTo(contents[counter]);
      setCounter(counter + 1);
    }
  };

  return (
    <>
      <MagicMotion
        initialContent="const value = 5;"
        animateTo={animateTo}
        codeHighlight={{
          languageName: "javascript",
        }}
        duration={{
          seconds: 2,
        }}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationFinished={() => setIsAnimating(false)}
        styles={{
          height: "75px",
        }}
      />
      <button onClick={handler}>Animate</button>
    </>
  );
};

export default App;
```
