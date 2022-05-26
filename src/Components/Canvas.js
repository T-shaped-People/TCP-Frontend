import React, { useRef, useState, useEffect } from "react";
import '../styleComponents/Canvas.css';

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [ctx, setCtx] = useState();
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('black');

    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext("2d");
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        contextRef.current = context;
        setCtx(context);

    }, []);

    const startDrawing = () => {
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        setIsDrawing(false);
    }

    // nativeEvent => js에서의 event
    const drawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if (ctx) {
            if (!isDrawing) {
                // console.log(ctx);
                // strokeStyle: "#000000"
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            } else {
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
            }
        }
    }

    const changeColor = (c) => {
        setColor(c);
        console.log(c);
    }

    const goHome = () => {
        // eslint-disable-next-line no-restricted-globals
        history.push('/');
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
                <button onClick={()=>{changeColor('black')}}><div className="color black"></div></button>
                <button onClick={()=>{changeColor('red')}}><div className="color red"></div></button>
                <button onClick={()=>{changeColor('green')}}><div className="color green"></div></button>
                <button onClick={()=>{changeColor('blue')}}><div className="color blue"></div></button>
                <button onClick={()=>{changeColor('yellow')}}><div className="color yellow"></div></button>
            </div>
        </div>
    )
}

export default Canvas;
