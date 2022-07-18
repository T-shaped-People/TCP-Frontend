import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar(){
    const navigate = useNavigate();
    function randomColor(){
        const color = ["#6554C0", "#4FCBDF", "#EC994B", "#36B37E"];
        const index = Math.floor(Math.random() * 4);
        return color[index];
    }
    return(
        <div className={"sidebar"}>
            <img src={"images/tcpicon2.png"} alt={"icon"} className={"sidebar--tcp"} onClick={()=>{ navigate('/'); }}/>
            <div className={"sidebar--square"} style={{
                backgroundColor:  randomColor()
            }}></div>
            <div className={"sidebar--square"} style={{
                backgroundColor:  randomColor()
            }}></div>
            <img src={"images/whiteplus.png"} alt={"icon"} className={"sidebar--plus"}/>
        </div>
    )
}
export default Sidebar;
