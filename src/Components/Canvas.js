import React, { useRef, useState, useEffect } from "react";
import '../styleComponents/Canvas.css';
import { Emit, getPosition, test } from '../Utils/SocketDrawing';

const Canvas = () => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [ctx, setCtx] = useState();
    const [isDrawing, setIsDrawing] = useState(false);

    // 기본 검정색
    const [color, setColor] = useState('black');

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // CanvasRenderingContext2D 객체 
        const context = canvas.getContext("2d");
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        contextRef.current = context;
        setCtx(context);
    }, []);

    // 캔버스에서 마우스가 눌러졌을 때
    const startDrawing = () => {
        setIsDrawing(true);
    }

    // 캔버스에서 마우스가 떼졌을 때
    const finishDrawing = () => {
        setIsDrawing(false);
    }

    // nativeEvent => js에서의 event
    const drawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        if (ctx) {
            // 움직이기
            if (!isDrawing) {
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            }
            // 그리기 
            else {
                ctx.lineTo(offsetX, offsetY);
                Emit(offsetX, offsetY);
                ctx.stroke();
                getPosition();
            }
        }
    }

    // 컬러 바꾸기 color state에 저장
    const changeColor = (c) => {
        setColor(c);
    }

    return (
        <div className="Canvas">
            <canvas ref={canvasRef}
                className="whiteboard"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={drawing}
                onMouseLeave={finishDrawing}>
            </canvas>
            <div className="colors">
                <button onClick={() => { changeColor('black') }}><div className="color black"></div></button>
                <button onClick={() => { changeColor('red') }}><div className="color red"></div></button>
                <button onClick={() => { changeColor('green') }}><div className="color green"></div></button>
                <button onClick={() => { changeColor('blue') }}><div className="color blue"></div></button>
                <button onClick={() => { changeColor('yellow') }}><div className="color yellow"></div></button>
            </div>
        </div>
    )
}

export default Canvas;