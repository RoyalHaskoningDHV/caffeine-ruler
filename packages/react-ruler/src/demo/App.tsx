import React, { useEffect, useRef } from "react";
import Ruler from "../react-ruler/Ruler";
import "./App.css";

const App = (): JSX.Element => {
    // const rulerRefHorizontal = useRef<Ruler>();
    const rulerRefVertical = useRef<Ruler>();

    useEffect(() => {
     // let scrollX = 0;
        let scrollY = 0;
        const onMouseWheel = (e: WheelEvent): void => {
            // scrollX += e.deltaX;
            scrollY += e.deltaY;

            // rulerRefHorizontal.current.scroll(scrollX);
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
            {/* <Ruler
                type="horizontal"
                ref={rulerRefHorizontal}
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
                ref={rulerRefVertical}
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

export default App;
