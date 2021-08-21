import { DefaultPopupConfig, OptionalDefaultPopupConfig, PopupConfig } from './types/PopupConfig'
import { PopupHTMLElement } from './types/PopupElement'
import { PopupDataInfo, PopupInstance } from './types/PopupInstance'

const contentAttrName = 'data-messy-content'
// const vname = 'MessyPopup'
const aname = 'messyPopup'
const dataDraggableHandle = 'data-messy-draggable-handle'
const globalWrapperClassName = 'messy-popup'

// utils
class HTMLElementUtil {
  convertTextToElement(str: string): Element | null {
    const div = document.createElement('div')
    div.innerHTML = str
    return div.firstElementChild
  }
  show(el: PopupHTMLElement): PopupHTMLElement {
    el.style.visibility = ''
    return el
  }
  hide(el: PopupHTMLElement): PopupHTMLElement {
    el.style.visibility = 'hidden'
    return el
  }
  destroy(el: PopupHTMLElement): PopupHTMLElement {
    return el.parentNode?.removeChild(el) ?? el
  }
  setDraggable(el: PopupHTMLElement, set?: boolean): PopupHTMLElement {
    const unset = set === false
    unset ? this.unbindDraggable.call(el, el) : this.bindDraggable.call(el, el)
    return el
  }

  // CSS 삽입
  insertCss(css: string): boolean {
    // 기존 sheet 사용
    const sheet: CSSStyleSheet | undefined =
      Array.from(document.styleSheets).find((sh) => sh.href === null) ||
      (() => {
        // 등록가능한 sheet가 없는 경우
        const style = document.createElement('style')
        style.setAttribute('data-messy-popup', 'true')
        document.querySelector('head')?.appendChild(style)
        return Array.from(document.styleSheets).find((sh) => sh.href === null)
      })()
    return sheet ? sheet.insertRule(css, sheet.cssRules.length) >= 0 : false
  }
  // draggable 속성 해제
  unbindDraggable(elmnt: HTMLElement): void {
    const targetElement: HTMLElement = elmnt.querySelector('[' + dataDraggableHandle + ']') ?? elmnt
    targetElement.onmousedown = null
  }
  // draggable 속성 연결
  bindDraggable(elmnt: HTMLElement): void {
    // from https://www.w3schools.com/howto/howto_js_draggable.asp
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    const targetElement: HTMLElement = elmnt.querySelector('[' + dataDraggableHandle + ']') ?? elmnt
    targetElement.onmousedown = dragMouseDown

    function dragMouseDown(e: MouseEvent): void {
      // e = e || window.event;
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    function elementDrag(e: MouseEvent): void {
      // e = e || window.event;
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      // convert bottom to top
      if (elmnt.style.bottom) {
        elmnt.style.top = elmnt.offsetTop + 'px'
        elmnt.style.bottom = ''
      }
      // convert right to left
      if (elmnt.style.right) {
        elmnt.style.left = elmnt.offsetLeft + 'px'
        elmnt.style.right = ''
      }
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
    }

    function closeDragElement(): void {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
class MessyPopupInstance implements PopupInstance {
  public popupInfo: PopupDataInfo
  private _config: DefaultPopupConfig
  public instanceConfig: DefaultPopupConfig | undefined

  private htmlUtil: HTMLElementUtil

  constructor() {
    this.htmlUtil = new HTMLElementUtil()
    this.popupInfo = {}
    this.instanceConfig = undefined
    this._config = {
      root: 'body',
      wrapper: ((): HTMLElement => document.createElement('div'))(),
      global: {
        // hide: true,
        draggable: true,
        style: {
          zIndex: 1000,
        },
      },
    }
  }

  init(): this {
    const cssList = [
      `.${globalWrapperClassName} { background-color: #fff; }`,
      // `.${globalWrapperClassName} [data-messy-content] { height: 100%; }`,
    ]
    cssList.forEach(this.htmlUtil.insertCss)

    return this
  }

  addPopupInfo(id: string, el: PopupHTMLElement): void {
    this.popupInfo[id] = el
  }
  removePopupInfo(id: string): void {
    delete this.popupInfo[id]
  }

  // setConfig(customConfig: undefined): this
  // setConfig(customConfig: OptionalDefaultPopupConfig): this
  setConfig(customConfig: OptionalDefaultPopupConfig): this {
    const getDefinedValue = <T>(...args: Array<T | undefined>): T | undefined => args.find((arg) => arg !== undefined)
    // const wrapObj = function(key, value) {
    //   var _o = {}
    //   _o[key] = value
    //   return _o
    // }
    // const wrapObj = (k: string, v: any): object => ({ [k]: v })
    const defaultConfig: DefaultPopupConfig = this._config
    const currentConfig: DefaultPopupConfig = {
      root: getDefinedValue(customConfig?.root, defaultConfig.root),
      wrapper: getDefinedValue(customConfig?.wrapper, defaultConfig.wrapper),
      global: {
        draggable: getDefinedValue(customConfig?.global?.draggable, defaultConfig.global.draggable),
        style: {
          zIndex: getDefinedValue(customConfig?.global?.style?.zIndex, customConfig?.global?.zIndex /* 설정 alias */, defaultConfig?.global?.style?.zIndex),

          top: getDefinedValue(customConfig?.global?.style?.top, defaultConfig.global.style?.top),
          left: getDefinedValue(customConfig?.global?.style?.left, defaultConfig.global.style?.left),
          bottom: getDefinedValue(customConfig?.global?.style?.bottom, defaultConfig.global.style?.bottom),
          right: getDefinedValue(customConfig?.global?.style?.right, defaultConfig.global.style?.right),
          position: getDefinedValue(customConfig?.global?.style?.position, defaultConfig.global.style?.position),
          width: getDefinedValue(customConfig?.global?.style?.width, defaultConfig.global.style?.width),
          height: getDefinedValue(customConfig?.global?.style?.height, defaultConfig.global.style?.height),
        },
      },
    }
    this.instanceConfig = currentConfig
    return this
  }

  createPopup(...popupConfigList: Array<PopupConfig>): this {
    const config: DefaultPopupConfig = <DefaultPopupConfig>this.instanceConfig
    const body: Element = <Element>document.querySelector(config.root ?? '')

    popupConfigList
      .filter((item) => item.id)
      .map((item: PopupConfig): [PopupHTMLElement, PopupConfig] => {
        const { id, wrapper, content, style = {} } = item
        const { zIndex: globalZIndex } = config.global

        const div: PopupHTMLElement = <PopupHTMLElement>(wrapper === undefined ? config.wrapper : this.htmlUtil.convertTextToElement(wrapper))?.cloneNode(true)
        div.id = id
        div.classList.add(globalWrapperClassName)

        const contentDiv: Element =
          div.querySelector(`[${contentAttrName}]`) ??
          (() => {
            div.setAttribute(contentAttrName, '') /* wrapper 자신을 contentDiv로 지정 */
            return div
          })()
        contentDiv.innerHTML = content
        div.dataset[aname] = ''
        // console.log('style', style)
        // div.dataset[aname + 'Id'] = id
        div.style.top = style?.top?.toString() || ''
        div.style.left = style?.left?.toString() || ''
        div.style.bottom = style?.bottom?.toString() || ''
        div.style.right = style?.right?.toString() || ''
        div.style.position = style?.position || 'absolute'
        div.style.zIndex = ((zIndex) => {
          switch (typeof zIndex) {
          case 'undefined':
            return ''
          case 'number':
            return `${zIndex}`
          default:
            return zIndex
          }
        })(style?.zIndex || style?.['z-index'] || globalZIndex)

        // FIXME: 테스트, wrapper의 최상위 자식 노드로 고정
        const child: HTMLElement | null = div.querySelector(`[${contentAttrName}] > *:first-child`)
        if (child) {
          child.style.width = style?.width?.toString() || ''
          child.style.height = style?.height?.toString() || ''
        }

        // 초기 생성시에는 안보이도록
        div.style.visibility = 'hidden'

        // 메소드 바인딩
        div.show = () => this.htmlUtil.show(div)
        div.hide = () => this.htmlUtil.hide(div)
        div.destroy = () => {
          this.removePopupInfo(id)
          return this.htmlUtil.destroy(div)
        }
        div.setDraggable = () => this.htmlUtil.setDraggable(div)
        div.unsetDraggable = () => this.htmlUtil.setDraggable(div, false)

        this.addPopupInfo(id, div)
        return [div, item]
      })
      .map(([popup, item]: [PopupHTMLElement, PopupConfig]): PopupHTMLElement => {
        const getBooleanFunctionalValue = (...args: Array<(() => boolean | undefined) | boolean | undefined>) => {
          for (const arg of args) {
            const value = typeof arg === 'function' ? arg() : arg
            if (typeof value === 'boolean') return value
            // else continue
          }
          return
        }
        const draggable: boolean = getBooleanFunctionalValue(item.draggable, config.global.draggable) ?? false
        const show: boolean = <boolean>(() => {
          // 우선도에 따른 조회값(item.show, global.show, !item.hide, !global.hide, true)에 따라 리턴
          return getBooleanFunctionalValue(
            item.show,
            () => (typeof item.hide === 'boolean' ? !item.hide : undefined),
            config.global.show,
            () => (typeof config.global.hide === 'boolean' ? !config.global.hide : undefined),
            true
          )
        })()

        body.appendChild(popup)
        if (draggable) popup.setDraggable()
        if (show) popup.show()
        return popup
      })
    return this
  }
  getPopup(id: string): PopupHTMLElement {
    return this.popupInfo[id]
  }
  show(id: string): this {
    const el = this.getPopup(id)
    el.show()
    return this
  }
  hide(id: string): this {
    const el = this.getPopup(id)
    el.hide()
    return this
  }
  destroy(id: string): this {
    const el = this.getPopup(id)
    el.destroy()
    return this
  }
  destroyAll(): this {
    Object.keys(this.popupInfo).forEach(this.destroy)
    return this
  }
  setDraggable(id: string): this {
    const el = this.getPopup(id)
    el.setDraggable()
    return this
  }
  unsetDraggable(id: string): this {
    const el = this.getPopup(id)
    el.unsetDraggable()
    return this
  }
  unsetDraggableAll(): this {
    Object.keys(this.popupInfo).forEach(this.unsetDraggable)
    return this
  }
  getPopupCount(): number {
    return Object.keys(this.popupInfo).length
  }
  forEach(fn: ([id, el]: [string, PopupHTMLElement], i: number, arr: Array<[string, PopupHTMLElement]>) => void): this {
    Object.entries(this.popupInfo).forEach(([id, el]: [string, PopupHTMLElement], i: number, arr: Array<[string, PopupHTMLElement]>) => {
      // fn.apply(this, [el, id, i, arr])
      return fn.apply(this, [[id, el], i, arr])
    })
    return this
  }
  
  // deprecated
  // 모듈 방식 변경에 따라 불필요할듯?? 
  // noConflict(w: typeof window): this {
  //  delete w[vname]
  noConflict(): this {
    return this
  }
  // config(customConfig: undefined): this
  // config(customConfig: OptionalDefaultPopupConfig): this
  config(customConfig: OptionalDefaultPopupConfig): this {
    return this.setConfig(customConfig)
  }
}
const _MessyPopup = new MessyPopupInstance()
const MessyPopup = _MessyPopup.init()

export default MessyPopup
