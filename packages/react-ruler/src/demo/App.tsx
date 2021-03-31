
import { Component } from "react";
import * as React from "react";
import Scene from "scenejs";
import "./App.css";
import Ruler from "../react-ruler/Ruler";
import { ref } from "framework-utils";

export default class App extends Component<{}> {
    private scene: Scene = new Scene();
    // private editor!: Editor;
    // private rulerRefHorizontal: Ruler;
    private rulerRefVertical: Ruler;
    public render() {
        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                {/* <Ruler
                    type="horizontal"
                    ref={ref(this, "rulerRefHorizontal")}
                    mainLineSize={12}
                    shortLineSize={3}
                    longLineSize={6}
                    style={{
                        paddingBottom: '4px',
                        width: '100%',
                        height: '24px',
                    }}
                    unit={1}
                    zoom={35}
                    direction="start"
                    backgroundColor="#000000"
                    lineColor="#78797b"
                    textColor="#bbbbbb"
                    textFormat={(scale: number): string => (-scale).toString()}
                /> */}
                <Ruler
                    type="vertical"
                    ref={ref(this, "rulerRefVertical")}
                    mainLineSize={12}
                    shortLineSize={3}
                    longLineSize={6}
                    style={{
                        paddingRight: '4px',
                        width: '24px',
                        height: '100%',
                    }}
                    unit={1}
                    zoom={35}
                    direction="start"
                    backgroundColor="#000000"
                    lineColor="#78797b"
                    textColor="#bbbbbb"
                    textFormat={(scale: number): string => (-scale).toString()}
                />
            </div>
        );
    }
    public componentDidMount() {
        // let scrollX = 0;
        let scrollY = 0;
        window.addEventListener("wheel", e => {

            // scrollX += e.deltaX;
            scrollY += e.deltaY;

            // this.rulerRefHorizontal.scroll(scrollX);
            this.rulerRefVertical.scroll(scrollY);
        });
    }
}
