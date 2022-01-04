import './style.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';

export default function UploadPage() {
  const [title, setTitle] = useState()
  const [file, setFile] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)




    // try {
    //   const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/media/new`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ title, })
    //   });
    //   const content = await rawResponse.json();

    //   // If the response is not 200 throw an error
    //   if (rawResponse.status !== 200) {
    //     throw new Error(content.err)
    //   }
    // }
    // catch (err) {
    //   // console.log(err)
    //   throw new Error(err.message)
    // }

    // setLoading(false)
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
