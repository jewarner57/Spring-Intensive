import './style.css';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ImageDropzone from '../../components/ImageDropzone';
import UploadForm from '../../components/UploadForm';
import LoadingFullPage from '../../components/LoadingFullPage';
import useApi from '../../hooks/useApi';
import useFileUpload from '../../hooks/useFileUpload';

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  const [error, setError] = useState()
  const [uploadLocation, setUploadLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { uploadPhoto, loading: ipfsloading, type } = useFileUpload(file)
  const { fetchApi } = useApi(`${process.env.REACT_APP_API_URL}/media/save`, false, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, location: uploadLocation, type: type, private: true })
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser) { navigate('/signin'); return }
    if (title === '') { setError('Please enter a title'); return }
    if (file === '') { setError('No image selected'); return }
    setLoading(true)
    // set the upload location to the result of 
    // calling the uploadPhoto hook
    setUploadLocation(await uploadPhoto())
  }

  const createPost = async () => {
    // call the fetchApi hook to save the post to the db
    const { error, data } = await fetchApi()
    setLoading(false)

    if (error) { setError(error); return }
    if (!data?.id) { setError('Error saving post to server.'); return }
    navigate(`/post/${data.id}`)
  }

  // we can't directly call create post after setUploadLocation (line 38)
  // because the state will not have updated yet
  // so we use useEffect to trigger once the uploadLocation changes
  useEffect(() => {
    if (uploadLocation && !ipfsloading) {
      createPost()
    }
  }, [uploadLocation])

  return (
    <div className="upload-page">
      {loading ? <LoadingFullPage titleText={'Uploading... Please Wait'} /> : ''}
      <div className="upload-container">
        <ImageDropzone image={file} setImage={setFile} />
        <div className="upload-form">
          <h2 className="upload-title">Upload Photos</h2>
          <UploadForm
            error={error}
            loading={loading}
            submitText="CREATE POST"
            handleFormSubmit={handleFormSubmit}
            fields={[
              {
                id: "title", label: 'Title', required: false, type: 'text',
                val: title, setVal: setTitle
              },
              {
                id: "file", label: 'Image', required: false, type: 'file',
                val: file.name, setVal: setFile
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
