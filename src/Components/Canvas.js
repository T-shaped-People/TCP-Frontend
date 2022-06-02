import React, { useRef, useState, useEffect } from "react";
import '../styleComponents/Canvas.css';
// import { Emit, getPosition, test } from '../Utils/SocketDrawing';
import io from 'socket.io-client';
const socket = io.connect(`http://13.125.87.53:3000`);

const Canvas = () => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [ctx, setCtx] = useState();
    const [isDrawing, setIsDrawing] = useState(false);

    // 기본 검정색
    const [color, setColor] = useState('black');
    const [prevposition, setPrevposition] = useState({prevX: 0, prevY: 0});

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

        drawLine(context, 1, 1, 100, 100, 'black');
    }, []);

    // 캔버스에서 마우스가 눌러졌을 때
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        setIsDrawing(true);
        setPrevposition({prevX: offsetX, prevY: offsetY});
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
            if (isDrawing){
                socket.emit('draw', {
                    'x1': prevposition.prevX,
                    'y1': prevposition.prevY,
                    'x2': offsetX,
                    'y2': offsetY,
                    color: color,
                });
                drawLine(ctx, prevposition.prevX, prevposition.prevY, offsetX, offsetY, color);
            }
        }

        socket.on('draw', (data) => drawLine(ctx, data.x1, data.y1, data.x2, data.y2, data.color));
    }
    
    // 컬러 바꾸기 color state에 저장
    const changeColor = (c) => {
        setColor(c);
    }

    // 드로우 모듈
    const distance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    const getAngle = (x, y) => Math.atan(y / (x == 0 ? 0.01 : x)) + (x < 0 ? Math.PI : 0);

    const drawLine = (context, x1, y1, x2, y2, color) => {
        context.fillStyle = color;
        const dist = distance(x1, y1, x2, y2); 
        const ang = getAngle(x2 - x1, y2 - y1); 
        for(let i = 0;i < dist;i++) context.fillRect(Math.round(x1 + Math.cos(ang) * i), Math.round(y1 + Math.sin(ang) * i), 5, 5);
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