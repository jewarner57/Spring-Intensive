import LikeButton from '../LikeButton'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function PostCard(props) {
  const { post } = props
  const navigate = useNavigate()

  const shortenTitle = (title) => {
    if (title.length > 50) {
      return `${title.slice(0, 50)}...`
    }
    return title
  }

  return (
    <div className="card-wrapper" >
      <Link to={`/post/${post._id}`} className="post-detail-link">
        <div className="card-content">
          {post?.type === 'video' ?
            <video controls playsinline={true} autoPlay={true} loop={true} name="media" muted={true} className="video-container">
              <source src={`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`} type="video/mp4"></source>
            </video>
            :
            <div className="image-container">
              <img className="card-image" src={`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`} alt="post content" />
            </div>
          }
          <div className="post-title">
            <p>{shortenTitle(post.title)}</p>
          </div>
        </div>
      </Link>
      <div className="post-action-list">
        <LikeButton post={post} />
        <div className="post-action" onClick={() => { navigate(`/post/${post._id}`) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="gray" width="24" height="24" viewBox="0 0 24 20"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm-5 11.5c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5z" /></svg>
          <p className="post-icon-count">{post.comments}</p>
        </div>
      </div>
    </div >
  );
}