import { useState } from 'react';
import './style.css';

export default function CommentForm(props) {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  const createComment = async () => {
    setError()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/comment/create/`, {
        method: 'POST',
        credentials: 'include'
      })

      const content = await res.json();

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(res.msg)
      }
      // set the content and leave loading state
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      throw new Error(err.message)
    }
  }

  return (
    <div className="comment-form-section">
    </div>
  );
}
