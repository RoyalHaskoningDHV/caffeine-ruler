import * as React from "react";
import { ref } from "framework-utils";
import { RulerInterface, RulerProps } from "./types";
import { convertUnitSize } from "@daybrush/utils";

export default class Ruler extends React.PureComponent<RulerProps> implements RulerInterface {
    public static defaultProps: RulerProps = {
        type: "horizontal",
        zoom: 1,
        zoomLevel: 1,
        width: 0,
        height: 0,
        unit: 50,
        negativeRuler: true,
        mainLineSize: "100%",
        longLineSize: 10,
        shortLineSize: 7,
        direction: "end",
        style: { width: "100%", height: "100%" },
        backgroundColor: "#333333",
        textColor: "#ffffff",
        lineColor: "#777777",
        fontSize: 10,
        highlight: undefined,
    };
    public divisionsElement!: HTMLElement;
    public state = {
        scrollPos: 0,
    };
    public canvasElement!: HTMLCanvasElement;
    private canvasContext!: CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;
    public render() {
        return (<canvas
            ref={ref(this, "canvasElement")}
            style={this.props.style} />);

    }
    public componentDidMount() {
        const canvas = this.canvasElement;
        const context = canvas.getContext("2d")!;

        this.canvasContext = context;

        this.resize();
    }
    public componentDidUpdate() {
        this.resize();
    }
    /**
     * @method Ruler#scroll
     * @param scrollPos
     */
    public scroll(scrollPos: number) {
        this.draw(scrollPos);
    }
    /**
     * @method Ruler#resize
     */
    public resize() {
        const canvas = this.canvasElement;
        const {
            width,
            height,
            scrollPos,
        } = this.props;

        this.width = width || canvas.offsetWidth;
        this.height = height || canvas.offsetHeight;
        canvas.width = this.width * 2;
        canvas.height = this.height * 2;
        this.draw(scrollPos);
    }
    private draw(scrollPos: number = this.state.scrollPos) {
        const props = this.props;
        const {
            unit,
            zoom,
            zoomLevel,
            type,
            backgroundColor,
            lineColor,
            textColor,
            direction,
            negativeRuler = true,
            textFormat,
            fontSize,
            highlight
        } = props as Required<RulerProps>;
        const width = this.width;
        const height = this.height;
        const state = this.state;
        state.scrollPos = scrollPos;
        const context = this.canvasContext;
        const isHorizontal = type === "horizontal";
        const isDirectionStart = direction === "start";
        const isNegative = negativeRuler !== false;
        const textAlign = props.textAlign || "left";
        const textOffset = props.textOffset || [0, 0];
        const containerSize = isHorizontal ? height : width;
        const mainLineSize = convertUnitSize(`${props.mainLineSize || "100%"}`, containerSize);
        const longLineSize = convertUnitSize(`${props.longLineSize || 10}`, containerSize);
        const shortLineSize = convertUnitSize(`${props.shortLineSize || 7}`, containerSize);

        const scaledWidth = width * 2;
        const scaledHeight = height * 2;

        if (backgroundColor === "transparent") {
            // Clear existing paths & text
            context.clearRect(0, 0, scaledWidth, scaledHeight);
        } else {
            // Draw the background
            context.rect(0, 0, scaledWidth, scaledHeight);
            context.fillStyle = backgroundColor;
            context.fill();
        }

        context.save();
        context.scale(2, 2);

        if (isDirectionStart) {
            context.textBaseline = "top";
        }
        context.translate(0.5, 0);
        context.beginPath();

        const size = isHorizontal ? width : height;
        const zoomUnit = zoom * unit;
        const minRange = Math.floor(scrollPos * zoom / zoomUnit);
        const maxRange = Math.ceil((scrollPos * zoom + size) / zoomUnit);
        const length = maxRange - minRange;
        const alignOffset = Math.max(["left", "center", "right"].indexOf(textAlign) - 1, -1);

        // Draw the highlight if exist
        if (highlight) {
            const hightlightStart = (highlight[0] * unit - scrollPos) * zoom;
            const hightlightEnd = (highlight[1] * unit - scrollPos) * zoom;
            const hightLightHeight = hightlightEnd - hightlightStart;
            context.fillStyle = 'rgba(100, 75, 255, 0.5)';
            context.fillRect(0, hightlightStart, scaledWidth, hightLightHeight);
        }

        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.font = `${fontSize}px Barlow, sans-serif`;
        context.fillStyle = textColor;

        // Loop trough the units (ranges)
        for (let i = 0; i <= length; ++i) {
            const value = i + minRange;

            if (!isNegative && value < 0) {
                continue;
            }
            const startPos = (value * unit - scrollPos) * zoom;

            for (let j = 0; j < 10; ++j) {
                const pos = startPos + j / 10 * zoomUnit;

                if (pos < 0 || pos >= size) {
                    continue;
                }

                const halfLineSize = mainLineSize;

                const lineSize = j === 0
                    ? mainLineSize
                    : (j % 2 === 0 ? longLineSize : zoomLevel >= 3 && j === 5 ? halfLineSize : shortLineSize);

                const [x1, y1] = isHorizontal
                    ? [pos, isDirectionStart ? 0 : height - lineSize]
                    : [isDirectionStart ? 0 : width - lineSize, pos];
                const [x2, y2] = isHorizontal ? [x1, y1 + lineSize] : [x1 + lineSize, y1];
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
            }


            // set the values (text)
            if (startPos >= -zoomUnit && startPos < size + unit * zoom) {
                const [startX, startY] = isHorizontal
                    ? [startPos + alignOffset * -3, isDirectionStart ? 17 : height - 17]
                    : [isDirectionStart ? 17 : width - 17, startPos + alignOffset * 3];

                let text = `${value * unit}`;

                if (textFormat) {
                    text = textFormat(value * unit);
                }

                context.textAlign = textAlign;
                const textPosX = startX + textOffset[0];
                const textPosY = startY + textOffset[1];

                if (isHorizontal) {
                    context.fillText(text, textPosX, textPosY);
                } else {
                    context.save();
                    context.translate(textPosX, textPosY);
                    context.rotate(-Math.PI / 2);
                    context.fillText(text, 0, 0);

                    if (zoomLevel >= 3 && unit === 1) {
                        text = (+text + 0.5).toString();
                        context.fillText(text, zoomUnit / 2, 0);
                    }
                    context.restore();
                }
            }
        }
        context.stroke();
        context.restore();
    }
}
