import React, { useEffect } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import { useParams, Link } from 'react-router-dom';
import './style.css';
import CommentList from '../../components/CommentList';
import ED from '@jewarner57/easydate'
import useApi from '../../hooks/useApi';
import ShareButton from '../../components/ShareButton';
import ProfilePic from '../../components/ProfilePic';
import PostSharePrompt from '../../components/PostSharePrompt';
import Error404Page from '../Error404Page'
import GeneralErrorPage from '../GeneralErrorPage'

export default function ViewPost() {
  const { id } = useParams();
  const { loading, error, data: { media }, fetchApi } = useApi(`${process.env.REACT_APP_API_URL}/media/get/${id}`)


  useEffect(() => {
    fetchApi()
    window.scrollTo(0, 0)
  }, [id])

  return (
    <React.Fragment>
      {error ? 
        (error === '404: Resource not found' ? <Error404Page /> : <GeneralErrorPage msg={error} />)
      :
        <div className="view-post-page">
          {!loading && media ?
            <div className="post-card">
              <div className="post-header">
                <PostSharePrompt media={media} />
                <div className="poster-info">
                  <Link to={`/profile/${media.author._id}`} className='post-user-profile'>
                    <ProfilePic size={'large'} alt={media.author.username[0].toUpperCase()} image={`${process.env.REACT_APP_IPFS_READ_URL}${media.author.profilepic}`} />
                    <div className="post-header-info">
                      <p className="post-content-header">{media.author.username[0].toUpperCase() + media.author.username.slice(1)}</p>
                      <p className="post-content-date">{new ED(media.createdAt).format("%b %d, %Y")}</p>
                    </div>
                  </Link>
                  <ShareButton post={media} />
                </div>
              </div>

              {media?.type === 'video' ?
                <video controls playsInline autoPlay loop name="media" muted className="post-image-wrapper">
                  <source src={`${process.env.REACT_APP_IPFS_READ_URL}${media.location}`} type="video/mp4"></source>
                </video>
                :
                <div className="post-image-wrapper">
                  <img src={`${process.env.REACT_APP_IPFS_READ_URL}${media.location}`} alt="Post Media" />
                </div>
              }

              <div className="post-content">
                <CommentList post={media} commentCount={media.comments} />
              </div>
            </div>
            :
            <LoadingCircle />
          }
        </div >
      }
    </React.Fragment >
  );
}
