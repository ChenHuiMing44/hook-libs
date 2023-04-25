import {IButtonMenu, IDomEditor, Boot} from '@wangeditor/editor'
import FileIcon from '@/assets/images/file_icon.svg'
import VideoIcon from '@/assets/images/video_icon.svg'
import ImgIcon from '@/assets/images/img_icon.svg'
import ApiFile from '@/apis/file'
import {CusLink, MediaElement, ParagraphElement} from '@/config/types'


type Callback = (editor: IDomEditor, value: string | boolean) => void

export type Props = {
  cb: Callback
}

export class FileBtnMenu implements IButtonMenu {

  title = ''

  tag = ''

  iconSvg = ''

  constructor() {
    this.title = '上传文件'
    this.tag = 'button'
    this.iconSvg = `<Upload><img src='${FileIcon}' alt=""/></Upload>`
  }

  getValue(): boolean | string {
    return 'file'
  }

  isActive() {
    return false
  }

  isDisabled(editor?: IDomEditor) {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if(this.isDisabled(editor)) return
    // this.cb(editor, value)
    console.log('点击文件')
    const dom = document.createElement('input')
    dom.type = 'file'
    dom.accept = '.docx,.pdf,.xlsx,.doc,.csv'
    dom.addEventListener('change', (e ) => {
      const targetDom = e.target as HTMLInputElement
      if(targetDom.files?.length) {
        console.log(targetDom.files?.[0])
        ApiFile.upload({ file: targetDom.files?.[0] }).then((res: any) => {
          if(res && res.code === 0 && res.data?.uri ) {
            const cusLink: CusLink =  { type: 'link',
              url: res.data.uri as string, target: '_blank', children: [{text: res.data.uri}]}
            editor.insertNode(  {  type: 'paragraph', children: [cusLink]} as ParagraphElement)
          }
        })
      }
    })
    dom.click()
  }

}

export class VideoBtnMenu implements IButtonMenu {

  title = ''

  tag = ''

  iconSvg = ''


  constructor() {
    this.title = '上传视频'
    this.tag = 'button'
    this.iconSvg = `<img src='${VideoIcon}' alt=""/>`
  }

  getValue(): boolean | string {
    return 'video'
  }

  isActive() {
    return false
  }

  isDisabled(editor?: IDomEditor) {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if(this.isDisabled(editor)) return

    const dom = document.createElement('input')
    dom.type = 'file'
    dom.accept = 'video/*'
    dom.addEventListener('change', (e ) => {
      const targetDom = e.target as HTMLInputElement
      if(targetDom.files?.length) {
        console.log(targetDom.files?.[0])
        ApiFile.upload({ file: targetDom.files?.[0] }).then((res: any) => {
          if(res && res.code === 0 && res.data?.uri ) {

            editor.insertNode( { type: 'video', src: res.data.uri as string, children: [{ text: 'i' }]} as MediaElement)
          }
        })
      }
    })
    dom.click()
    // dom.removeEventListener('change')
  }
}

export class ImgBtnMenu implements IButtonMenu {

  title = ''

  tag = ''

  iconSvg = ''


  constructor() {
    this.title = '上传图片'
    this.tag = 'button'
    this.iconSvg = `<img src='${ImgIcon}' alt=""/>`
  }

  getValue(): boolean | string {
    return 'img'
  }

  isActive() {
    return false
  }

  isDisabled(editor?: IDomEditor) {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if(this.isDisabled(editor)) return
    // this.cb(editor, value)
    const dom = document.createElement('input')
    dom.type = 'file'
    dom.accept = 'image/*'
    dom.addEventListener('change', (e ) => {
      const targetDom = e.target as HTMLInputElement
      if(targetDom.files?.length) {
        console.log(targetDom.files?.[0])
        ApiFile.upload({ file: targetDom.files?.[0] }).then((res: any) => {
          if(res && res.code === 0 && res.data?.uri ) {
            //成功的
            console.log()
            // editor.insertNode()
            editor.insertNode(  {  type: 'paragraph', children: [
              { type: 'image', src: res.data.uri, children: [{text: ''}] } as MediaElement
              ]} as ParagraphElement)
          }
          console.log(res)
        })

      }
    })
    dom.click()
  }
}



export const register = () => {
  Boot.registerMenu({
    key: 'fileUpload1',
    factory(){
      return new FileBtnMenu()
    }
  })
  Boot.registerMenu({
    key: 'videoUpload1',
    factory(){
      return new VideoBtnMenu()
    }
  })

  Boot.registerMenu({
    key: 'imgUpload1',
    factory(){
      return new ImgBtnMenu()
    }
  })


}

