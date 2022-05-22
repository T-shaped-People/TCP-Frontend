import io from 'socket.io-client';

const socket = io.connect(`http://3.34.191.118:3000`);

const getPosition = () => {
    socket.on('position', ({x, y})=> {
        return {x, y};
    })    
}

const Emit = (x, y) => {
    socket.emit('position',{x, y});
}

export { Emit, getPosition };