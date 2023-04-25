import React, {useEffect, useState} from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor'
import { register } from '@/pages/parts/components/cusMenu'
import styled from './fileTextarea.module.less'
register()


const NilFunc = () => ({})

const isJSON = (v: string) => {
  if(v) {
    try {
      const target = JSON.parse(v)
      if(Array.isArray(target)) {
        return target
      }
    } catch (e) {}
  }
  return false
}

const getEditorValue = (v: string) => {
  const value = isJSON(v)
  return value || [{type: 'paragraph', children: [{ text: '' }]}]
  // return value || (value ? [{type: 'paragraph', children: [{text: ''}]}] : '')
}

type Props = {
  changeJson?: (json: string) => void,
  defaultValue?: string,
  disable?: boolean
}

const FileTextarea = (props: Props) => {

  const [editorText, setEditorText] = useState('<div></div>')

  const [editor, setEditor] = useState<IDomEditor | null>(null)

  const { defaultValue = '', changeJson = NilFunc } = props

  useEffect(() => {
    return () => {
      if(editor) {
        editor.destroy()
        setEditor(null)
      }
    }
  }, [editor, defaultValue])
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'fileUpload1',
      'videoUpload1',
      'imgUpload1'
    ]
  }  // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    readOnly: props.disable,
    hoverbarKeys: {
      link: {
        menuKeys: ['viewLink'],
      },
      image: {
        menuKeys: []
      },
      text: {
        menuKeys: [],
      },
      video: {
        menuKeys: []
      }
    },
    MENU_CONF: {

    }
  }

  const handleChange = (editor: IDomEditor) => {
    setEditorText(editor.getHtml())
    // SlateTransforms.
    // changeJson(editor.getText() ? JSON.stringify(editor.children) : '')
    changeJson(editor.isEmpty() ? '':  JSON.stringify(editor.children))
    // changeJson(JSON.stringify(editor.children))
  }

  return (
    <div className={styled.fileTextarea}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultContent={getEditorValue(defaultValue)}
        defaultConfig={editorConfig}
        value={editorText}
        onCreated={setEditor}
        onChange={handleChange}
        mode="default"
        style={{ height: '500px', overflowY: 'hidden', backgroundColor: '#ff8900' }}
      />
    </div>
  )
}

export default FileTextarea
