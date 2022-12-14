import { useState } from "react"
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client'

const useFileUpload = (file) => {
  const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const api_key = process.env.REACT_APP_INFURA_API_KEY;
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + api_key).toString('base64');

  const client = create({
    host: process.env.REACT_APP_IPFS_GATEWAY,
    port: process.env.REACT_APP_IPFS_PORT,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')

  const isValidUploadFile = (upload) => {
    // is the file an image
    const type = upload?.type.split('/')[0]
    setType(type ? type : '')
    return (type === 'image' || type === 'video')
  }

  const uploadPhoto = async () => {
    setLoading(true)
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
      setLoading(false)
      return added.path
    } catch (err) {
      setError('Error uploading file.')
      setLoading(false)
    }

    return false
  }
  return { error, uploadPhoto, type, loading }
};
export default useFileUpload