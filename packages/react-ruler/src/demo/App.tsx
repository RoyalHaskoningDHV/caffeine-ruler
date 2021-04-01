import React, { useEffect, useRef } from "react";
import Ruler from "../react-ruler/Ruler";
import "./App.css";

const ZOOM_LEVEL = 3;
const UNIT = ZOOM_LEVEL < 1 ? 2 : 1;
const STEP_DISTANCE = 35;

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
                highlight={[5, 10]}
            />
        </div>
    );
}

export default App;
