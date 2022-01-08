import './style.css';
import image404 from '../../images/404-image.svg'

function Error404Page() {
  return (
    <div className='error-404'>
      <h1 className="title-404">404: Page Not Found</h1>
      <p className="desc-404">We searched everywhere, but couldn't find the page you're looking for.</p>
      <img src={image404} alt="404 error" />
    </div>
  );
}

export default Error404Page;