import { useRef } from 'react'
import useReactive from '@/hooks/useReactive'
import * as monaco from 'monaco-editor'

export const useMonaco = () => {
  const monacoRef = useRef<HTMLDivElement>(null)
  const state = useReactive({
    codeValue: '',
    monacoInstance: null,
    opts: {},
    editorOptions: undefined,
    defaultOpts: {
      value: '', // 编辑器的值
      theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
      roundedSelection: false, // 右侧不显示编辑器预览框
      autoIndent: true // 自动缩进
    }
  })
  const init = (defaultCode?: string, opts?: any) => {
    if (defaultCode) {
      state.defaultOpts.value = defaultCode
      state.codeValue = defaultCode
    }
    if (monacoRef.current) {
      monacoRef.current.innerHTML = ''
      state.editorOptions = Object.assign(state.defaultOpts, opts)
      // 生成编辑器对象
      const monacoEditor = monaco.editor.create(monacoRef.current, state.editorOptions)
      monacoEditor.onDidChangeModelContent(() => {
        state.codeValue = monacoEditor.getValue()
      })
    }
  }
  return { state, monacoRef, init }
}
