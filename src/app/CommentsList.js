import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, getComments, getStatus } from "./CommentsSlice";

const CommentsList = () => {
    const dispatch = useDispatch();

    const comments = useSelector(getComments);
    const commentsStatus = useSelector(getStatus);

    useEffect(() => {
        if (commentsStatus === '') {
            dispatch(fetchComments());
        }
    }, [comments, commentsStatus, dispatch])

    return (
        <div className="comments_list">
            <h1>Comments List</h1>
            {
                comments.length === 0 && commentsStatus === 'loading' && (
                    <div className="lds-dual-ring"></div>
                )
            }
            {comments.length === 0 && commentsStatus === 'failed' && (
                <h2>Something goes wrong</h2>
            )}
            {
                !!comments.length && commentsStatus === 'success' && comments.map((comment) => (
                    <div
                        className="comment_item"
                        key={comment.id}
                    >
                        <h3>{comment.name}</h3>
                        <h4>{comment.email}</h4>
                        <p>{comment.body}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default CommentsList;