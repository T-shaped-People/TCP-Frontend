import '../styles/comment.css';
import { Recomment } from '../allFiles';
import { useState } from 'react';

function PostComment({postComment})
{
    return(
        <div>

        </div>
    )
}

export default function Comment({ postId, comment, deleteComment })
{
    const [change, setChange] = useState(false);
    const createMarkup = () => {
        return {__html: comment.content};
    }

    const postComment = () => {

    }

    const created = comment.createdAt;
    const hour = Number(comment.createdAt.substring(12, 13))+9;
    const realHour = Number(hour) < 10 ? "0" + String(hour) : String(hour);
    const date = created.substring(0, 10) + " " + realHour + "시 " + created.substring(14, 16) + "분 " + created.substring(17, 19)+"초";


    return(
        <>
            <div className="read-comment">
                <p className="read-comment-nickname">{comment.nickname}</p>
                <p className="read-comment-date">{date}</p>
                <p className="read-comment-content" dangerouslySetInnerHTML={createMarkup()}></p>
                {comment.permission && <button onClick={()=> deleteComment(comment.id) } className="read-comment-delete">
                    삭제
                    </button>}
                <button className='read-comment-post' >댓글 달기</button>
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
            </div>
        </>
    )
}