import Comment from '../Comment';
import LoadingCircle from '../LoadingCircle';
import CommentForm from '../CommentForm';
import { useEffect, useState } from 'react';
import LikeButton from '../../components/LikeButton'
import './style.css';

export default function CommentList(props) {
  const { post, commentCount } = props
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState()

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () => {
    setError()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/comment/post/get/${post._id}`, {
        method: 'GET',
        credentials: 'include'
      })

      const content = await res.json();

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(res.msg)
      }
      // set the content and leave loading state
      setComments(content.comments)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      throw new Error(err.message)
    }
  }

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
