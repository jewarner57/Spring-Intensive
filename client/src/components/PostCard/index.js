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
    </div>
  );
}