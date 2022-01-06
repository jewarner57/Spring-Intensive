import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './style.css';

export default function LikeButton(props) {
  const { post } = props
  const { clearUser, currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [error, setError] = useState()

  useEffect(() => {
    if (currentUser) checkIsLiked(post._id)
  }, [])

  const likeImage = async (id) => {
    if (!loading) {
      setLoading(true)

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/media/like`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: id })
        })

        const content = await res.json();

        // if the user isn't logged in
        if (res.status === 401) {
          clearUser()
          navigate('/signin')
          return
        }

        // If the response is not 200 throw an error
        if (res.status !== 200) {
          setError('Post could not be liked')
          return
        }

        setIsLiked(content.liked)
        setLikeCount((prev) => (prev + (content.liked ? 1 : -1)))
        setLoading(false)
      }
      catch (err) {
        setLoading(false)
        throw new Error(err.message)
      }
    }
  }

  const checkIsLiked = async (id) => {
    if (!loading) {
      setLoading(true)

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/media/isliked`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: id })
        })

        const content = await res.json();

        setIsLiked(content.liked)
        setLoading(false)
      }
      catch (err) {
        setLoading(false)
        throw new Error(err.message)
      }
    }
  }

  return (
    <div className="post-action" onClick={() => likeImage(post._id)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? '#79C99E' : 'gray'} width="24" height="24" viewBox="0 0 24 24"><path d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z" /></svg>
      <p className="post-icon-count">{likeCount}</p>
    </div>
  );
}