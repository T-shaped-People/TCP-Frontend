import { MainHeader } from '../allFiles';
import '../styles/maketeam.css';
import { Link } from 'react-router-dom'

function MakeTeam()
{
    return(
        <div className="makeTeam-root">
            <MainHeader />
            <div className='maketeam-div'>
                <h1 className='maketeam-title'>팀 만들기</h1>
                <div className='maketeam-subdiv'>
                    <p className='maketeam-subtitle'>새 팀을 만들어보세요</p>
                    <div className='maketeam-thrdiv'>
                        <Link to="/makeproject"><button className="maketeam-button">새 팀 만들기</button></Link>
                        <li className='maketeam-li'>
                            <span className='maketeam-other'>팀에 참여 받은 것이라면?</span>
                            <Link className='maketeam-link' to="/">새 팀 참여하기</Link>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeTeam;