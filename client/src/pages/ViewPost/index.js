import React, { useState, useEffect } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import Error404Page from '../Error404Page';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './style.css';
import CommentList from '../../components/CommentList';
import ED from '@jewarner57/easydate'

export default function ViewPost() {
  const [loading, setLoading] = useState(true)
  const [postContent, setPostContent] = useState({})
  const [error, setError] = useState()
  const { id } = useParams();
  const { clearUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    getPost()
  }, [id])

  const getPost = async () => {
    setError()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/media/get/${id}`, {
        method: 'GET',
        credentials: 'include'
      })

      const content = await res.json();

      if (res.status === 401) {
        clearUser()
        navigate('/signin')
      }

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(<Error404Page />)
      }
      // set the content and leave loading state
      setPostContent(content.media)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      throw new Error(err.message)
    }
  }

  return (
    <React.Fragment>
      {error ? error :
        <div className="view-post-page" >
          {loading ?
            <LoadingCircle />
            :
            <div>
              <div className="post-card">
                <div className="post-image-wrapper">
                  <img src={`${process.env.REACT_APP_IPFS_READ_URL}${postContent.location}`} alt="Post Media" />
                </div>
                <div className="post-content">
                  <Link className="post-header" to={`/profile/${postContent.author._id}`}>
                    <div className="button-primary">
                      {postContent.author.username[0].toUpperCase()}
                    </div>
                    <div className="post-header-info">
                      <p className="post-content-header">{postContent.author.username[0].toUpperCase() + postContent.author.username.slice(1)}</p>
                      <p className="post-content-date">{new ED(postContent.createdAt).format("%b %d, %Y")}</p>
                    </div>
                  </Link>
                  <CommentList post={postContent} commentCount={postContent.comments} />
                </div>
              </div>
            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}
