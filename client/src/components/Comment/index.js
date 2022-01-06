import './style.css';
import ED from '@jewarner57/easydate'

export default function Comment(props) {
  const { comment } = props

  return (
    <div className="comment">
      <div className="comment-poster-info">
        <div className="comment-pfp">
          <a class="no-style-link" href={`/#/profile/${comment.user._id}`} >{comment.user.username[0].toUpperCase()}</a>
        </div>
        <div>
          <a class="no-style-link" href={`/#/profile/${comment.user._id}`} >
            <b>{comment.user.username[0].toUpperCase() + comment.user.username.slice(1,)
            }</b></a> - {
            new ED(new ED()).when(new ED(comment.createdAt))
          }
        </div>
      </div>
      <p className="comment-text">{comment.content}</p>
    </div>
  );
}
