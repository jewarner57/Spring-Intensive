import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useApi from '../../hooks/useApi';
import './style.css';

export default function PostSharePrompt(props) {
  const { media } = props
  const { currentUser } = useAuth()
  const [isPrivate, setIsPrivate] = useState(media.private)
  const { error, fetchApi } = useApi(`${process.env.REACT_APP_API_URL}/media/share`, false,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: media._id })
    }
  )

  const sharePost = async () => {
    const res = await fetchApi()
    // if the request was successful
    if (res?.data?.success === true) {
      setIsPrivate(false)
    }
  }

  return (
    <>
      {
        media.private === true && media.author._id === currentUser._id && isPrivate ?
          <div className="post-hidden-tip">
            <div className="button-primary share-with-public" onClick={() => sharePost()}>Share With Community</div>
            <div className="post-hidden-text">This post is currently <span>hidden</span>.</div>
            <div className="hidden-text-tooltip">This post can still be shared by its link, but will not appear publicly in feeds or your profile. Click <span>Share With Community</span> to make it public.</div>
            {error ? <p className="error-text">{error}</p> : ''}
          </div>
          : ''
      }
    </>
  );
}
