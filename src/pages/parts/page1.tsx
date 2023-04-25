import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import React, { useState } from 'react'

function MyComponent() {
  const [value, setValue] = useState('')

  return <ReactQuill theme="snow" value={value} onChange={setValue} />
}

export default MyComponent
