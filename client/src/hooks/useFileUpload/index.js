import { useState } from "react"
import { create } from 'ipfs-http-client'

const useFileUpload = (file) => {
  const client = create('https://ipfs.infura.io:5001/api/v0')
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