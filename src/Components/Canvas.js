import '../styleComponents/Canvas.css'
import { Link } from "react-router-dom";

function Login() {
    const goHome = () => {
        // eslint-disable-next-line no-restricted-globals
        history.push('/');
    }
    return (
        <div className={"Canvas"}>
            <canvas class="whiteboard"></canvas>
            <div class="colors">
                <div class="color black"></div>
                <div class="color red"></div>
                <div class="color green"></div>
                <div class="color blue"></div>
                <div class="color yellow"></div>
            </div>
        </div>
    )
}
export default Login;
