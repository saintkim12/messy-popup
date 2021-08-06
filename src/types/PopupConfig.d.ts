import { PopupStyle } from './PopupStyle'

// 공통 팝업 설정과 팝업별 설정의 공통값
type CommonPopupConfig = {
  draggable: boolean
  style: PopupStyle
  show: boolean
  hide: boolean
}

// 팝업 디폴트 설정값
export declare type DefaultPopupConfig = {
  root: string
  wrapper: HTMLElement
  global: DefaultPopupElementConfig
}

// 팝업 디폴트 엘리먼트 설정값
export declare type DefaultPopupElementConfig = Partial<CommonPopupConfig> & {
  // style.zIndex의 alias(설정시만 사용)
  zIndex?: string | number
}

// 팝업별 설정값
export declare type PopupConfig = Partial<CommonPopupConfig> & {
  id: string
  wrapper?: string
  content: string
}

export declare type OptionalDefaultPopupConfig = Partial<DefaultPopupConfig>

export default PopupConfig
