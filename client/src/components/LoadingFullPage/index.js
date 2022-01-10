import LoadingCircle from '../LoadingCircle';
import './style.css';

export default function LoadingFullPage(props) {
  return (
    <div className="fullpage-loading-container">
      <p className="fullpage-loading-text">{props.titleText}</p>
      <LoadingCircle />
    </div>
  );
}
