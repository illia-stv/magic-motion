"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[950],{7171:(n,o,t)=>{t.r(o),t.d(o,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var e=t(4848),i=t(8453);const s={sidebar_position:1},a="Duration",r={id:"Tutorial Basics/duration",title:"Duration",description:"MagicMotion allows you to manipulate the duration of the animation. You can set the duration value by using one of the following string values:",source:"@site/docs/Tutorial Basics/duration.md",sourceDirName:"Tutorial Basics",slug:"/Tutorial Basics/duration",permalink:"/magic-motion/docs/Tutorial Basics/duration",draft:!1,unlisted:!1,editUrl:"https://github.com/illia-stv/magic-motion/tree/main/docs/docs/Tutorial Basics/duration.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Tutorial Intro",permalink:"/magic-motion/docs/intro"},next:{title:"Variants",permalink:"/magic-motion/docs/Tutorial Basics/variants"}},c={},l=[{value:"Custom duration",id:"custom-duration",level:2}];function d(n){const o={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(o.header,{children:(0,e.jsx)(o.h1,{id:"duration",children:"Duration"})}),"\n",(0,e.jsxs)(o.p,{children:[(0,e.jsx)(o.strong,{children:"MagicMotion"})," allows you to manipulate the duration of the animation. You can set the ",(0,e.jsx)(o.code,{children:"duration"})," value by using one of the following ",(0,e.jsx)(o.code,{children:"string"})," values:"]}),"\n",(0,e.jsxs)(o.ul,{children:["\n",(0,e.jsxs)(o.li,{children:[(0,e.jsx)(o.code,{children:"very slow"})," (5 seconds)"]}),"\n",(0,e.jsxs)(o.li,{children:[(0,e.jsx)(o.code,{children:"slow"})," (4 seconds)"]}),"\n",(0,e.jsxs)(o.li,{children:[(0,e.jsx)(o.code,{children:"normal"})," (3 seconds)"]}),"\n",(0,e.jsxs)(o.li,{children:[(0,e.jsx)(o.code,{children:"fast"})," (2 seconds)"]}),"\n",(0,e.jsxs)(o.li,{children:[(0,e.jsx)(o.code,{children:"very fast"})," (1 seconds)"]}),"\n"]}),"\n",(0,e.jsx)(o.pre,{children:(0,e.jsx)(o.code,{className:"language-jsx",children:"import { MagicMotion } from 'magic-motion';\n\nconst App = () => {\n    const [animateTo, setAnimateTo] = useState();\n\n    const buttonHandler = () => {\n        setAnimateTo('const sum = (a, b) => a + b;');\n    };\n\n    return (\n        <>\n            <MagicMotion\n                initialContent=\"const value = 5;\"\n                animateTo={animateTo}\n                duration=\"fast\"\n            />\n            <button onClick={buttonHandler}>Animate</button>\n        </>\n    );\n};\n\nexport default App;\n"})}),"\n",(0,e.jsx)(o.h2,{id:"custom-duration",children:"Custom duration"}),"\n",(0,e.jsx)(o.p,{children:"You could set a custom value of animation's duration."}),"\n",(0,e.jsx)(o.p,{children:"In seconds:"}),"\n",(0,e.jsx)(o.pre,{children:(0,e.jsx)(o.code,{className:"language-jsx",children:'<MagicMotion\n    initialContent="Hello world"\n    animateTo={animateTo}\n    duration={{\n        seconds: 1.5,\n    }}\n/>\n'})}),"\n",(0,e.jsx)(o.p,{children:"In milliseconds:"}),"\n",(0,e.jsx)(o.pre,{children:(0,e.jsx)(o.code,{className:"language-jsx",children:'<MagicMotion\n    initialContent="Hello world"\n    animateTo={animateTo}\n    duration={{\n        milliseconds: 1750,\n    }}\n/>\n'})})]})}function u(n={}){const{wrapper:o}={...(0,i.R)(),...n.components};return o?(0,e.jsx)(o,{...n,children:(0,e.jsx)(d,{...n})}):d(n)}},8453:(n,o,t)=>{t.d(o,{R:()=>a,x:()=>r});var e=t(6540);const i={},s=e.createContext(i);function a(n){const o=e.useContext(s);return e.useMemo((function(){return"function"==typeof n?n(o):{...o,...n}}),[o,n])}function r(n){let o;return o=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),e.createElement(s.Provider,{value:o},n.children)}}}]);