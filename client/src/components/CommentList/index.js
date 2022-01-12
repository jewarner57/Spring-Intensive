import Comment from '../Comment';
import LoadingCircle from '../LoadingCircle';
import CommentForm from '../CommentForm';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import LikeButton from '../../components/LikeButton'
import './style.css';

export default function CommentList(props) {
  const { post, commentCount } = props
  const [comments, setComments] = useState([])
  const { loading, error, data } = useApi(`${process.env.REACT_APP_API_URL}/comment/post/get/${post._id}`)

  useEffect(() => {
    setComments(data.comments ? data.comments : [])
  }, [data])

  return (
    <div>
      <div className="comment-section">
        <div className="comment-list-header">
          <LikeButton post={post} />
          <p className="comment-title">{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}:</p>
        </div>
        <CommentForm postID={post._id} setComments={setComments} />
        {loading ?
          <LoadingCircle />
          :
          comments.length > 0 ?
            <div className="comment-scroll-container">
              {error ? <p className="error-text">{error}</p> : ''}
              {comments.map((comment) => {
                return <Comment comment={comment} key={comment._id} />
              })}

            </div>
            :
            ''
        }
      </div>
    </div>
  );
}
