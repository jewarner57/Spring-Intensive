import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';
import Error404Page from '../Error404Page';
import './style.css';

export default function ViewPost() {
  const [loading, setLoading] = useState(true)
  const [postContent, setPostContent] = useState({})
  const [error, setError] = useState()
  const { id } = useParams();

  useEffect(() => {
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

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(<Error404Page />)
      }
      // set the content and leave loading state
      setPostContent(content)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      throw new Error(err.message)
    }
  }

  const formatDate = (date) => {
    // Short Month, Date Fullyear
    const month = date.toLocaleString('en-US', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
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
                  <a className="post-header" href={`/#/profile/${postContent.author._id}`}>
                    <div className="button-primary">
                      {postContent.author.username[0].toUpperCase()}
                    </div>
                    <div className="post-header-info">
                      <p className="post-content-header">{postContent.author.username[0].toUpperCase() + postContent.author.username.slice(1)}</p>
                      <p className="post-content-date">{formatDate(new Date(postContent.createdAt))}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}
