import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import ED from '@jewarner57/easydate'
import useApi from '../../hooks/useApi';
import './style.css';

export default function Profile() {
  const { id } = useParams();

  const { loading, error, data: { media, user } } = useApi(`${process.env.REACT_APP_API_URL}/user/profile/${id}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
                  <p className="pfp-initial">{user.username[0].toUpperCase()}</p>
                </div>

                <div className="user-info">
                  <p className="pf-username">{user.username[0].toUpperCase() + user.username.slice(1)}</p>
                  <div>
                    <p className="user-info-item"><span>{media.length}</span> Posts</p>
                    <p className="user-info-item">Joined: <span>{new ED(user.createdAt).format('%b %d, %Y')}</span></p>
                  </div>
                </div>

                <div className="divide-line"></div>

                <PostList posts={media} />
              </div>

            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}