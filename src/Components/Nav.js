import "../styles/nav.css"

function Nav(){
    return(
            <div className={"nav_container"}>
                <nav className={"navbar"}>
                    <img src={"images/speechbubble.png"} alt={"icon"} className={"navbar--speech"}/>
                    <img src={"images/carbon_notebook.png"} alt={"icon"} className={"navbar--notebook"}/>
                    <input type={"text"} className={"navbar--input"}/>
                    <img src={"images/person.png"} alt={"icon"} className={"navbar--person"}/>
                    <p className={"navbar--username"}>min</p>
                </nav>
            </div>
    )
}
export default Nav;
