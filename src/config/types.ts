import { SlateElement } from '@wangeditor/editor'

export interface RequestParams{
  url: string,
  contentType?: string,
  data?: any,
  isBody?: boolean,
  method?: string,
  timeout?: number,
  extraHeader?: Record<string, any>,
  ext?: string
}


export interface CusLink extends SlateElement{
  type?: string,
  url?: string,
  fileName?: string,
  target?: string
}

export interface ParagraphElement extends SlateElement{
  type: string
}

export interface MediaElement extends SlateElement{
  type: string,
  src: string
}
