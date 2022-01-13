import LikeButton from '../LikeButton'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import ShareButton from '../ShareButton';

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
      <div className="card-content">
        {post?.type === 'video' ?
          <>
            <video controls playsInline autoPlay loop name="media" muted className="video-container">
              <source src={`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`} type="video/mp4"></source>
            </video>
            <Link to={`/post/${post._id}`} className="post-detail-link">
              <div className="post-title">
                <p>{shortenTitle(post.title)}</p>
              </div>
            </Link>
          </>
          :
          <Link to={`/post/${post._id}`} className="post-detail-link">
            <div className="image-container">
              <img className="card-image" src={`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`} alt="post content" />
            </div>
            <div className="post-title">
              <p>{shortenTitle(post.title)}</p>
            </div>
          </Link>
        }
        {post.private === true ? <div className="private-post-indicator">
          Hidden
          <svg xmlns="http://www.w3.org/2000/svg" fill="gray" width="24" height="24" viewBox="0 0 24 24"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" /></svg>
        </div> : ''}
      </div>
      <div className="post-action-list">
        <div className="post-main-actions">
          <LikeButton post={post} />
          <div className="post-action" onClick={() => { navigate(`/post/${post._id}`) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="gray" width="24" height="24" viewBox="0 0 24 20"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm-5 11.5c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5z" /></svg>
            <p className="post-icon-count">{post.comments}</p>
          </div>
        </div>
        <div className="post-secondary-actions">
          <ShareButton post={post} />
        </div>
      </div>
    </div>
  );
}