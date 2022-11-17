import '../../styles/comment/Recomment.css';
import styled from 'styled-components'

export default function Recomment({ postId, comment, deleteComment })
{
    const createMarkup = () => {
        return {__html: comment.content};
    }
    const created = comment.createdAt;
    const hour = Number(comment.createdAt.substring(12, 13))+9;
    const realHour = Number(hour) < 10 ? "0" + String(hour) : String(hour);
    const date = created.substring(0, 10) + " " + realHour + "시 " + created.substring(14, 16) + "분 " + created.substring(17, 19)+"초";

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

    return(
        <>
            <ReReadComment>
                <p className="re-read-comment-nickname">{comment.nickname}</p>
                <p className="re-read-comment-date">{date}</p>
                <p className="re-read-comment-content" dangerouslySetInnerHTML={createMarkup()}></p>
                {comment.permission && <button onClick={()=> deleteComment(comment.id) } className="re-read-comment-delete">
                    삭제
                    </button>}
                    {comment.child && comment.child.map((value)=>{
                if (value.deleted !== true) {
                    return <Recomment postId={postId} comment={value} deleteComment={deleteComment} />
                }
                else {
                return <div className="deleted-comment">
                        <p>삭제된 댓글입니다.</p>
                    </div>
                }
            })}
            </ReReadComment>
        </>
    )
}