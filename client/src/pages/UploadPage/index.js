import './style.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../contexts/AuthContext';
import { create } from 'ipfs-http-client'

export default function UploadPage() {
  const [title, setTitle] = useState()
  const [file, setFile] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const client = create(`${process.env.REACT_APP_IPFS_GATEWAY}`)
  const { currentUser } = useAuth()

  const handleFormSubmit = async (e) => {
    if (!currentUser) {
      navigate('/signin')
      return
    }

    e.preventDefault()

    setLoading(true)
    const location = await uploadFileToIPFS()
    // If location is empty stop the upload
    console.log(location)
    if (!location) {
      setLoading(false)
      return
    }

    try {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/media/save`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, location })
      });
      const content = await rawResponse.json();

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
    const upload = file
    // if the file isn't an image
    if (upload['type'].split('/')[0] !== 'image') {
      // set error
      setError('Please upload an image')
      return false
    }

    try {
      // upload the file and return the hash
      const added = await client.add(file)
      return added.path
    } catch (err) {
      setError('Error uploading file to IPFS', err.message)
    }
  }

  return (
    <div className="upload-page">
      <div className="upload-container">

        <div className="upload-form">
          <h2 className="upload-title">New Post</h2>
          <AuthForm
            error={error}
            loading={loading}
            submitText="CREATE POST"
            handleFormSubmit={handleFormSubmit}
            fields={[
              {
                id: "title", label: 'Title', required: true, type: 'text',
                val: { title }, setVal: setTitle
              },
              {
                id: "file", label: 'Image', required: true, type: 'file',
                val: { file }, setVal: setFile
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
