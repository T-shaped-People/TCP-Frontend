import "../styleComponents/sidebar.css";

function Sidebar(){
    function randomColor(){
        const color = ["#6554C0", "#4FCBDF", "#EC994B", "#36B37E"];
        const index = Math.round(Math.random() * 4);
        return color[index];
    }
    return(
        <div className={"sidebar"}>
            <img src={"images/tcpicon2.png"} alt={"icon"} className={"sidebar--tcp"}/>
            <div className={"sidebar--square"} style={{
                backgroundColor:  randomColor()
            }}></div>
            <div className={"sidebar--square"} style={{
                backgroundColor:  randomColor()
            }}></div>
            <img src={"images/plusicon.png"} alt={"icon"} className={"sidebar--plus"}/>
        </div>
    )
}
export default Sidebar;
