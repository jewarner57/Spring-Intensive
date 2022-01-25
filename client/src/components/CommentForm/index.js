import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function CommentForm(props) {
  const { setComments, postID } = props
  const [commentText, setCommentText] = useState('')
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { error, data, fetchApi } = useApi(`${process.env.REACT_APP_API_URL}/comment/create/`, false, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post_id: postID, content: commentText })
  })

  useEffect(() => {
    setComments(prev => [...prev, data.comment])
  }, [data])

  const createComment = async (e) => {
    e.preventDefault()
    if (!currentUser) { return navigate('/signin') }
    setCommentText('')
    fetchApi()
  }

  return (
    <div className="comment-form-section">
      <form className="comment-form" onSubmit={(e) => createComment(e)}>
        <input type="text" name="comment" id="comment-input" placeholder="Tell 'em what yah think."
          value={commentText} onChange={(e) => setCommentText(e.target.value)} required />
        <button className="comment-submit-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" /></svg>
        </button>
      </form>
      {error ? <p className="comment-list-error">{error}</p> : ''}
    </div>
  );
}
