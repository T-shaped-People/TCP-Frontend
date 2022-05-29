import io from 'socket.io-client';

const socket = io.connect(`http://3.34.191.118:3000`);

const getPosition = () => {
    socket.on('sposition', ({x, y})=> {
        console.log(`x 값: ${x} y 값: ${y}`);
    })    
}

const test = () => {
    socket.on('sposition', () => {
        console.log("연결됨");
    })
}

const Emit = (x, y) => {
    socket.emit('position',{x, y});
}

export { Emit, getPosition, test };