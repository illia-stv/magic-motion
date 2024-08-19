"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[981],{1710:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var t=i(4848),s=i(8453);const o={sidebar_position:5},a="Code Hilghliting",r={id:"Tutorial Basics/code-hilghliting",title:"Code Hilghliting",description:"One of the primary features of MagicMotion is a code highlighting, powered by prismjs.",source:"@site/docs/Tutorial Basics/code-hilghliting.md",sourceDirName:"Tutorial Basics",slug:"/Tutorial Basics/code-hilghliting",permalink:"/magic-motion/docs/Tutorial Basics/code-hilghliting",draft:!1,unlisted:!1,editUrl:"https://github.com/illia_stv/magicmotion/tree/main/docs/docs/Tutorial Basics/code-hilghliting.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Styles",permalink:"/magic-motion/docs/Tutorial Basics/styles"},next:{title:"Callbacks",permalink:"/magic-motion/docs/Tutorial Basics/callbacks"}},c={},l=[{value:"Example",id:"example",level:2},{value:"Specify the language",id:"specify-the-language",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"code-hilghliting",children:"Code Hilghliting"})}),"\n",(0,t.jsxs)(n.p,{children:["One of the primary features of ",(0,t.jsx)(n.strong,{children:"MagicMotion"})," is a code highlighting, powered by ",(0,t.jsx)(n.a,{href:"https://prismjs.com/",children:"prismjs"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsxs)(n.p,{children:["To use code highlighting, you'll need to install ",(0,t.jsx)(n.a,{href:"https://prismjs.com/",children:"prismjs"}),". You can choose any theme you like, or you can use ",(0,t.jsx)(n.a,{href:"https://github.com/PrismJS/prism-themes",children:"prism-themes"}),", which offers a wider selection of themes. All you need to do is import the styles and define the language used in the code snippet. In our case, it's ",(0,t.jsx)(n.code,{children:"javascript"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import { MagicMotion } from 'magic-motion';\nimport 'prismjs/themes/prism.css';\n\nconst App = () => {\n    const [animateTo, setAnimateTo] = useState();\n\n    const buttonHandler = () => {\n        setAnimateTo('const sum = (a, b) => a + b;');\n    };\n\n    return (\n        <>\n            <MagicMotion\n                initialContent=\"const value = 5;\"\n                animateTo={animateTo}\n                codeHighlight={{\n                    languageName: 'javascript',\n                }}\n            />\n            <button onClick={buttonHandler}>Animate</button>\n        </>\n    );\n};\n\nexport default App;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"specify-the-language",children:"Specify the language"}),"\n",(0,t.jsx)(n.p,{children:"If the language you are using one of the following:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Markup - ",(0,t.jsx)(n.code,{children:"markup"}),", ",(0,t.jsx)(n.code,{children:"html"}),", ",(0,t.jsx)(n.code,{children:"xml"}),", ",(0,t.jsx)(n.code,{children:"svg"}),", ",(0,t.jsx)(n.code,{children:"mathml"}),", ",(0,t.jsx)(n.code,{children:"ssml"}),", ",(0,t.jsx)(n.code,{children:"atom"}),", ",(0,t.jsx)(n.code,{children:"rss"})]}),"\n",(0,t.jsxs)(n.li,{children:["CSS - ",(0,t.jsx)(n.code,{children:"css"})]}),"\n",(0,t.jsxs)(n.li,{children:["C-like - ",(0,t.jsx)(n.code,{children:"clike"})]}),"\n",(0,t.jsxs)(n.li,{children:["JavaScript - ",(0,t.jsx)(n.code,{children:"javascript"}),", ",(0,t.jsx)(n.code,{children:"js"})]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["You don't need to import any additional modules from ",(0,t.jsx)(n.code,{children:"Prism.js"}),". However, if you're using a language other than those listed above, your code should look like this:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import { MagicMotion } from 'magic-motion';\nimport 'prismjs/themes/prism.css';\nimport 'prismjs/components/prism-git.js';\n\nconst App = () => {\n    const [animateTo, setAnimateTo] = useState();\n\n    const buttonHandler = () => {\n        setAnimateTo('git rebase');\n    };\n\n    return (\n        <>\n            <MagicMotion\n                initialContent=\"git commit -m 'My commit.'\"\n                animateTo={animateTo}\n                codeHighlight={{\n                    languageName: 'git',\n                }}\n            />\n            <button onClick={buttonHandler}>Animate</button>\n        </>\n    );\n};\n\nexport default App;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["In the example above, we are using the ",(0,t.jsx)(n.code,{children:"git"})," language, which needs to be imported from ",(0,t.jsx)(n.code,{children:"Prism.js"}),". You can find a list of all supported languages ",(0,t.jsx)(n.a,{href:"https://prismjs.com/#supported-languages",children:"here"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var t=i(6540);const s={},o=t.createContext(s);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);