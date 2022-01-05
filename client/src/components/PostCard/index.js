import './style.css';

export default function PostCard(props) {
  const { post } = props

  const shortenTitle = (title) => {
    if (title.length > 50) {
      return `${title.slice(0, 50)}...`
    }
    return title
  }

  return (
    <div className="card-wrapper" >
      <a href={`/#/post/${post._id}`} className="post-detail-link">
        <div className="card-content">
          <div className="image-container">
            <img className="card-image" src={`${process.env.REACT_APP_IPFS_READ_URL}${post.location}`} alt="post content" />
          </div>
          <div className="post-title">
            <p>{shortenTitle(post.title)}</p>
          </div>
        </div>
      </a>
      <div className="post-action-list">
        <div className="post-action">
          <svg xmlns="http://www.w3.org/2000/svg" fill="gray" width="24" height="24" viewBox="0 0 24 24"><path d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z" /></svg>
          <p className="post-icon-count">10</p>
        </div>
        <div className="post-action">
          <svg xmlns="http://www.w3.org/2000/svg" fill="gray" width="24" height="24" viewBox="0 0 24 20"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm-5 11.5c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5z" /></svg>
          <p className="post-icon-count">10</p>
        </div>
      </div>
    </div >
  );
}