import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import Error404Page from '../Error404Page'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ED from '@jewarner57/easydate'
import './style.css';

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [userContent, setUserContent] = useState()
  const [userPosts, setUserPosts] = useState()
  const [error, setError] = useState()
  const { id } = useParams();
  const { clearUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
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

      if (res.status === 401) {
        clearUser()
        navigate('/signin')
      }

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
                    <p className="user-info-item">Joined: <span>{new ED(userContent.createdAt).format('%b %d, %Y')}</span></p>
                  </div>
                </div>

                <div className="divide-line"></div>

                <PostList posts={userPosts} />
              </div>

            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}