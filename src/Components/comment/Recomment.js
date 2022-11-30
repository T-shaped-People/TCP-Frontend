import '../../styles/comment/Recomment.css';
import styled from 'styled-components'
import { elapsedTime, MilliSecondTime } from '../../utils/date';

export default function Recomment({ postId, comment, deleteComment })
{
    const createMarkup = () => {
        return {__html: comment.content};
    }

    const ReReadComment = styled.div`
        width: 100%;
        font-size: 15px;
        max-width: 65em;
        margin-left: 20px;
        margin-top: 20px;
        overflow: scroll;
        position: relative;
        background-color: rgb(239, 239, 239);
        padding: 10px;
        border-radius: 10px;
        &::-webkit-scrollbar{
            display: none;
        }
    `

    return (
        <ReReadComment>
            <div className='read-comment-div'>
                <img
                    src={`https://auth.bssm.kro.kr/resource/user/profile/${comment.usercode}.png`}
                    onError={e => e.currentTarget.src = '/images/profile_default.png'}
                    alt='유저 프로필'
                    className='comment-profileImg'
                />
                <div>
                    <p className="read-comment-nickname">{comment.nickname}</p>
                    <p className="read-comment-date">{elapsedTime(comment.createdAt, MilliSecondTime.MONTH)}</p>
                </div>
            </div>
            <p className="read-comment-content" dangerouslySetInnerHTML={createMarkup()}></p>
            {comment.permission && <button onClick={()=> deleteComment(comment.id) } className="re-read-comment-delete">
                삭제
            </button>}
            {comment.child && comment.child.map(value => (
                value.deleted
                ? <div className="deleted-comment">
                    <p>삭제된 댓글입니다.</p>
                </div>
                : <Recomment postId={postId} comment={value} deleteComment={deleteComment} />
            ))}
        </ReReadComment>
    );
}