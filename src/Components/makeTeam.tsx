import '../styles/maketeam.css';

function MakeTeam()
{
    return(
        <div className="makeTeam-root">
            <h1 className="makeTeam-title">팀 만들기</h1>
            <button className="makeTeam-button">팀 만들기</button>
            <p className="makeTeam-sub">이미 팀이 있다면</p>
            <button className="makeTeam-attend">팀 참가하기</button>
        </div>
    )
}

export default MakeTeam;