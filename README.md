
<p align="middle" ><img src="https://raw.githubusercontent.com/daybrush/ruler/master/demo/images/ruler.png"/></p>
<h2 align="middle">Ruler</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/@scena/ruler" target="_blank"><img src="https://img.shields.io/npm/v/@scena/ruler.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://github.com/daybrush/ruler/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/daybrush/ruler.svg?style=flat-square&label=license&color=08CE5D"/></a>
<a href="https://github.com/daybrush/ruler/tree/master/packages/react-ruler" target="_blank"><img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&color=61daeb"></a>
<a href="https://github.com/daybrush/ruler/tree/master/packages/preact-ruler" target="_blank"><img alt="Preact" src="https://img.shields.io/static/v1.svg?label=&message=Preact&style=flat-square&color=673ab8"></a>
<a href="https://github.com/daybrush/ruler/tree/master/packages/ngx-ruler" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&color=C82B38"></a>
<a href="https://github.com/daybrush/ruler/tree/master/packages/vue-ruler" target="_blank"><img
    alt="Vue"
    src="https://img.shields.io/static/v1.svg?label=&message=Vue&style=flat-square&color=3fb984"></a>
<a href="https://github.com/daybrush/ruler/tree/master/packages/svelte-ruler" target="_blank"><img
    alt="Vue"
    src="https://img.shields.io/static/v1.svg?label=&message=Svelte&style=flat-square&color=C82B38"></a>
</p>
<p align="middle">This is a fork of the @Scena Main Ruler component that can draw grids and scroll infinitely.</p>
<p align="middle">
    <a href="https://daybrush.com/ruler" target="_blank"><strong>Main Ruler Demo</strong></a> /
    <a href="https://daybrush.com/ruler/release/latest/doc/" target="_blank"><strong>Main Ruler API</strong></a> /
    <a href="https://github.com/daybrush/guides" target="_blank"><strong>Main Ruler Guides</strong></a> /
    <a href="https://github.com/daybrush/scena/ruler" target="_blank"><strong>Main Ruler Repo</strong></a>
</p>


## ⚙️ Installation
### npm
```sh
$ npm i @royalhaskoningdhv/ruler
```

## 🚀 How to use
```ts
import Ruler from "@royalhaskoningdhv/react-ruler"; // For example

import React, { useEffect, useRef } from "react";
import Ruler from "@royalhaskoningdhv/react-ruler";

const RulerExample = (): JSX.Element => {
    const rulerRefVertical = useRef<Ruler>();

    useEffect(() => {
        let scrollY = 0;
        const onMouseWheel = (e: WheelEvent): void => {
            scrollY += e.deltaY;
            if (rulerRefVertical) {
                rulerRefVertical.current.scroll(scrollY);
            }
        }

        window.addEventListener('wheel', onMouseWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel',onMouseWheel)
        }
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Ruler
                type="vertical"
                ref={rulerRefVertical}
                mainLineSize={12}
                shortLineSize={6}
                longLineSize={6}
                style={{
                    width: '24px',
                    height: '100%',
                }}
                unit={UNIT}
                zoom={ZOOM_LEVEL * STEP_DISTANCE}
                zoomLevel={ZOOM_LEVEL}
                direction="start"
                backgroundColor="#000000"
                lineColor="#78797b"
                textAlign="left"
                textColor="#bbbbbb"
                textOffset={[-7, 0]}
                textFormat={(scale: number): string => (-scale).toString()}
                fontSize={10}
                highlight={[5, 6.3]}
            />
        </div>
    );
}

export default App;

export interface RulerInterface {
    scroll(scrollPos: number): any;
    resize(): any;
}
export interface RulerProps {
    type?: "horizontal" | "vertical";
    width?: number;
    height?: number;
    unit?: number;
    zoom?: number;
    direction?: "start" | "end";
    style?: IObject<any>;
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    textFormat?: (scale: number) => string;
    fontSize?: string
    highlight?: [number, number]
}

```


## Steps to edit/contribute on the react-ruler

Step 1:  Change directory
```ts
    CD to packages/react-ruler
```

Step 2:  Install the dependencies
```ts
    npm install or npm i
```

Step 3: Run the app (default will open http://localhost:3000)
```ts
    npm start
```

To change the ruler setting open src/demo/App.tsx

To change the logic edit the src/react-ruler/Ruler.tsx

Types are in src/react-ruler/types

## 📝 License

This project is [MIT](https://github.com/daybrush/ruler/blob/master/LICENSE) licensed.

```
MIT License

Copyright (c) 2019 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
