import './style.css';
import ED from '@jewarner57/easydate'
import { Link } from 'react-router-dom'

export default function Comment(props) {
  const { comment } = props

  return (
    <div className="comment">
      <div className="comment-poster-info">
        <div className="comment-pfp">
          <Link className="no-style-link" to={`/#/profile/${comment.user._id}`} >{comment.user.username[0].toUpperCase()}</Link>
        </div>
        <div>
          <Link className="no-style-link" to={`/#/profile/${comment.user._id}`} >
            <b>{comment.user.username[0].toUpperCase() + comment.user.username.slice(1,)
            }</b></Link> - {
            new ED(new ED()).when(new ED(comment.createdAt))
          }
        </div>
      </div>
      <p className="comment-text">{comment.content}</p>
    </div>
  );
}
