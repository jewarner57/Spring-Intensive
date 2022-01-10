import React, { useState, useEffect } from 'react'
import LoadingCircle from '../../components/LoadingCircle';
import { useParams, Link } from 'react-router-dom';
import './style.css';
import CommentList from '../../components/CommentList';
import ED from '@jewarner57/easydate'
import useApi from '../../hooks/useApi';

export default function ViewPost() {
  const { id } = useParams();
  const { loading, error, data: { media } } = useApi(`${process.env.REACT_APP_API_URL}/media/get/${id}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <React.Fragment>
      {error ? error :
        <div className="view-post-page" >
          {loading ?
            <LoadingCircle />
            :
            <div className="post-card">
              <Link className="post-header" to={`/profile/${media.author._id}`}>
                <div className="button-primary">
                  {media.author.username[0].toUpperCase()}
                </div>
                <div className="post-header-info">
                  <p className="post-content-header">{media.author.username[0].toUpperCase() + media.author.username.slice(1)}</p>
                  <p className="post-content-date">{new ED(media.createdAt).format("%b %d, %Y")}</p>
                </div>
              </Link>
              <div className="post-image-wrapper">
                <img src={`${process.env.REACT_APP_IPFS_READ_URL}${media.location}`} alt="Post Media" />
              </div>
              <div className="post-content">
                <CommentList post={media} commentCount={media.comments} />
              </div>
            </div>
          }
        </div >
      }
    </React.Fragment>
  );
}
