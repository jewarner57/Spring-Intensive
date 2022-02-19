import './style.css';
import imageErrorGeneral from '../../images/general-error.svg'

function GeneralErrorPage(props) {
  return (
    <div className='error-general'>
      <h1 className="title-general">Uh oh. Something went wrong.</h1>
      <p className="desc-general">{props?.msg ? props.msg : null}</p>
      <img src={imageErrorGeneral} alt="general unknown error" />
    </div>
  );
}

export default GeneralErrorPage;