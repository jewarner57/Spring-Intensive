import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useApi from '../../hooks/useApi';
import './style.css';

export default function LikeButton(props) {
  const { post } = props
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [error, setError] = useState()
  const { fetchApi: postImageLike } = useApi(`${process.env.REACT_APP_API_URL}/media/like`, false,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: post._id })
    }
  )
  const { fetchApi: fetchIsLiked } = useApi(`${process.env.REACT_APP_API_URL}/media/isliked`, false,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: post._id })
    }
  )

  useEffect(() => {
    checkIsLiked()
  }, [])

  const likeImage = async () => {
    if (!loading) {
      setError()
      setLoading(true)

      const { data, error } = await postImageLike()
      setIsLiked(data.liked)
      setLikeCount((prev) => (prev + (data.liked ? 1 : -1)))
      setError(error)
      setLoading(false)
    }
  }

  const checkIsLiked = async () => {
    if (currentUser && !loading) {
      setError()
      setLoading(true)

      const { data, error } = await fetchIsLiked()
      setIsLiked(data.liked)
      setError(error)
      setLoading(false)
    }
  }

  return (
    <div className="post-action" onClick={() => likeImage()}>
      <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? '#79C99E' : 'gray'} width="24" height="24" viewBox="0 0 24 24"><path d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z" /></svg>
      <p className="post-icon-count">{likeCount}</p>
    </div>
  );
}