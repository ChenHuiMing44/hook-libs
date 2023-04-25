import React, {useState} from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'


const FileTextarea1 = () => {

  const [editorText, setEditorText] = useState('')
  //
  const changeText = (v: any) => {
    console.log('change: ', v)
  }

  const onSave = () => {
    console.log('onSave...')
  }

  return (
    <div>
      <BraftEditor
      />
      {/*<textarea>*/}
      {/*  /!*<p>这个是第一行</p>*!/*/}
      {/*  /!*<p>这是第二行</p>*!/*/}
      {/*  /!*<p>这个是第三行</p>*!/*/}
      {/*</textarea>*/}
    </div>
  )
}

export default FileTextarea1
