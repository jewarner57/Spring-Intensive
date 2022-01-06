import Comment from '../Comment';
import LoadingCircle from '../LoadingCircle';
import { useEffect, useState } from 'react';
import './style.css';

export default function CommentList(props) {
  const { postID, commentCount } = props
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/comment/post/get/${postID}`, {
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
    <div className="comment-section">
      <p className="comment-title">{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}:</p>
      <div className="comment-scroll-container">
        {loading ?
          <LoadingCircle />
          :
          comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />
          })
        }
      </div>
    </div>
  );
}
