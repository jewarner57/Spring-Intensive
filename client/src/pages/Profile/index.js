import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';
import PostCard from '../../components/PostCard';
import Error404Page from '../Error404Page'
import './style.css';

export default function ViewPost() {
  const [loading, setLoading] = useState(true)
  const [userContent, setUserContent] = useState()
  const [userPosts, setUserPosts] = useState()
  const [error, setError] = useState()
  const { id } = useParams();

  useEffect(() => {
    getProfile()
  }, [id])

  const getProfile = async () => {
    setLoading(true)
    setError()

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/profile/${id}`, {
        method: 'GET',
        credentials: 'include'
      })

      const content = await res.json();

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(<Error404Page />)
      }
      // set the content and leave loading state
      setUserContent(content.user)
      setUserPosts(content.media)
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

  // Divide post content over the four columns
  // This is so that we can have grid items of different heights
  const getPostsForColumn = (colNum, colName, colCount) => {
    return (
      <div className="post-column" style={{ gridArea: colName }}>
        {userPosts.map((post, index) => {
          if (index % colCount === colNum) {
            return <PostCard key={post.location + index} post={post} index={index} />
          }
          return ""
        })}
      </div>
    )
  }

  return (
    <React.Fragment>
      {error ? error :
        <div className="profile-page" >
          {loading ?
            <LoadingCircle />
            :
            <div className="profile">
              <div className="profile-top">
              </div>
              <div className="profile-bottom">
                <div className="pfp">
                  <p className="pfp-initial">{userContent.username[0].toUpperCase()}</p>
                </div>

                <div className="user-info">
                  <p className="pf-username">{userContent.username[0].toUpperCase() + userContent.username.slice(1)}</p>
                  <div>
                    <p className="user-info-item"><span>{userPosts.length}</span> Posts</p>
                    <p className="user-info-item">Joined: <span>{formatDate(new Date(userContent.createdAt))}</span></p>
                  </div>
                </div>

                <div className="divide-line"></div>

                <div className="post-container">
                  {getPostsForColumn(1, 'c1', 4)}
                  {getPostsForColumn(3, 'c2', 4)}
                  {getPostsForColumn(2, 'c3', 4)}
                  {getPostsForColumn(0, 'c4', 4)}
                </div>
              </div>

            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}