import { useState } from 'react';
import './style.css';

export default function CommentForm(props) {
  const [error, setError] = useState()
  const { setComments, postID } = props
  const [loading, setLoading] = useState(false)
  const [commentText, setCommentText] = useState('')

  const createComment = async (e) => {
    e.preventDefault()
    if (!loading) {
      setError()
      setLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/comment/create/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: postID, content: commentText })
        })

        const content = await res.json();

        // If the response is not 200 throw an error
        if (res.status !== 200) {
          setError(res.msg)
        }

        setComments(prev => [...prev, content.comment])
        setCommentText('')
        setLoading(false)
      }
      catch (err) {
        setError(err.message)
        setLoading(false)
        throw new Error(err.message)
      }
    }
  }

  return (
    <div className="comment-form-section">
      <form className="comment-form" onSubmit={createComment}>
        <input type="text" name="comment" id="comment-input" placeholder="Tell 'em what yah think."
          value={commentText} onChange={(e) => setCommentText(e.target.value)} required />
        <button className="comment-submit-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" /></svg>
        </button>
      </form>
    </div>
  );
}
