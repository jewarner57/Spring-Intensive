import './style.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { create } from 'ipfs-http-client'
import ImageDropzone from '../../components/ImageDropzone';
import UploadForm from '../../components/UploadForm';
import LoadingFullPage from '../../components/LoadingFullPage';

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  const [uploadType, setUploadType] = useState('image')
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const client = create('https://ipfs.infura.io:5001/api/v0')
  const { currentUser, clearUser } = useAuth()

  const setFileToUpload = (upload) => {
    setError()
    // is the file a valid upload?
    if (!isValidUploadFile(upload)) {
      // show an error
      setError('Please select an image.')
      return
    }
    setFile(upload)
  }

  const isValidUploadFile = (upload) => {
    // is the file an image
    const type = upload['type'].split('/')[0]

    if (type === 'image' || type === 'video') {
      setUploadType(type)
      return true
    }
    return false
  }

  const handleFormSubmit = async (e) => {
    setError()
    e.preventDefault()

    if (!currentUser) { navigate('/signin'); return }
    if (title === '') { setError('Please enter a title'); return }
    if (file === '') { setError('No image selected'); return }

    setLoading(true)

    try {
      // get the ipfs media hash
      const uploadLocation = await uploadFileToIPFS()
      // If location is empty stop the upload
      if (!uploadLocation) {
        setLoading(false)
        setError('Error uploading file.')
        return
      }

      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/media/save`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, location: uploadLocation, type: uploadType })
      });
      const content = await rawResponse.json();

      if (rawResponse.status === 401) {
        clearUser()
        navigate('/signin')
      }

      // If the response is not 200 throw an error
      if (rawResponse.status !== 200) {
        setError(content.err)
        throw new Error(content.err)
      }
      setLoading(false)

      navigate(`/post/${content.id}`)
    }
    catch (err) {
      setLoading(false)
      setError(err.message)
      throw new Error(err.message)
    }
  }

  const uploadFileToIPFS = async () => {
    setError()
    // if the file isn't a valid upload
    if (!isValidUploadFile(file)) {
      // show an error
      setError('Please select an image or video.')
      return false
    }

    try {
      // upload the file and return the hash
      const added = await client.add(file)
      return added.path
    } catch (err) {
      setError('Error uploading file.')
      console.log(err)
    }

    return false
  }

  return (
    <div className="upload-page">
      {loading ? <LoadingFullPage titleText={'Uploading... Please Wait'} /> : ''}
      <div className="upload-container">
        <ImageDropzone image={file} setImage={setFileToUpload} />
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
                val: file.name, setVal: setFileToUpload
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
