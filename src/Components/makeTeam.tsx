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
                    <p className='maketeam-subtitle'>새 프로젝트를 만들어보세요</p>
                    <div className='maketeam-thrdiv'>
                        <button className="maketeam-button">새 프로젝트 만들기</button>
                        <li className='maketeam-li'>
                            <span className='maketeam-other'>프로젝트에 참여 받은 것이라면?</span>
                            <Link className='maketeam-link' to="/">새 프로젝트 참여하기</Link>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeTeam;