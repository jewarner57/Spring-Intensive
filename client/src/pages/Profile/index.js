import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';
import PostList from '../../components/PostList';
import ED from '@jewarner57/easydate'
import useApi from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';
import './style.css';
import ProfilePic from '../../components/ProfilePic';
import PfpModal from '../../components/PfpModal';

export default function Profile() {
  const { id } = useParams();
  const { currentUser } = useAuth()
  const { loading, error, data: { media, user }, fetchApi } = useApi(`${process.env.REACT_APP_API_URL}/user/profile/${id}`)
  const [pfpModalOpen, setPfpModalOpen] = useState(false)

  useEffect(() => {
    fetchApi()
    window.scrollTo(0, 0)
  }, [id])

  return (
    <React.Fragment>
      {error ? error :
        <div className="profile-page" >
          <PfpModal open={pfpModalOpen} setOpen={setPfpModalOpen} refetchUser={fetchApi} />
          {loading ?
            <LoadingCircle />
            :
            <div className="profile">
              <div className="profile-top">
              </div>
              <div className="profile-bottom">
                <div className="pfp-container">
                  <div className={`pfp ${id === currentUser._id ? 'pfp-edit' : ''}`}>
                    <ProfilePic size={'xlarge'} alt={user.username[0].toUpperCase()} image={`${process.env.REACT_APP_IPFS_READ_URL}${user.profilepic}`} />
                    {id === currentUser._id ?
                      <button className="change-pfp-button" onClick={() => setPfpModalOpen(prev => !prev)}>
                        Edit Avatar
                      </button>
                      : ''}
                  </div>
                </div>

                <div className="user-info">
                  <p className="pf-username">{user.username[0].toUpperCase() + user.username.slice(1)}</p>
                  <div>
                    <p className="user-info-item"><span>{media.length}</span> Posts</p>
                    <p className="user-info-item">Joined: <span>{new ED(user.createdAt).format('%b %d, %Y')}</span></p>
                  </div>
                </div>

                <div className="divide-line"></div>

                <div className="user-profile-posts-title">
                  {currentUser._id === id ?
                    <>
                      <p>Your Posts:</p>
                      <Link to="/newpost"><button className="button-primary profile-new-post">New Post</button></Link>
                    </>
                    :
                    ''
                  }
                </div>

                <PostList posts={media} />
              </div>

            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}