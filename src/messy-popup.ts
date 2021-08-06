/// <reference path="types/PopupConfig.ts" />
/// <reference path="types/PopupElement.ts" />
/// <reference path="types/PopupInstance.ts" />
/// <reference path="types/PopupStyle.ts" />

;((document: Document | null): void => {
  if (!document) {
    // if not browser
    return
  }

  //
  const contentAttrName = 'data-messy-content'
  const vname = 'MessyPopup'
  const aname = 'messyPopup'
  const dataDraggableHandle = 'data-messy-draggable-handle'
  const globalWrapperClassName = 'messy-popup'

  // utils
  class HTMLElementUtil {
    convertTextToElement(str: string): Element {
      const div = document.createElement('div')
      div.innerHTML = str
      return div.firstElementChild
    }
    show(el: Messi.PopupHTMLElement): Messi.PopupHTMLElement {
      el.style.visibility = ''
      return el
    }
    hide(el: Messi.PopupHTMLElement): Messi.PopupHTMLElement {
      el.style.visibility = 'hidden'
      return el
    }
    destroy(el: Messi.PopupHTMLElement): Messi.PopupHTMLElement {
      return el.parentNode.removeChild(el)
    }
    setDraggable(el: Messi.PopupHTMLElement, set?: boolean): Messi.PopupHTMLElement {
      const unset = set === false
      unset ? this.unbindDraggable.call(el, el) : this.bindDraggable.call(el, el)
      return el
    }

    
    // CSS 삽입
    insertCss(css: string): boolean {
      // 기존 sheet 사용
      const sheet: CSSStyleSheet =
        Array.from(document.styleSheets).find((sh) => sh.href === null) ||
        (() => {
          // 등록가능한 sheet가 없는 경우
          const style = document.createElement('style')
          style.setAttribute('data-messy-popup', 'true')
          document.querySelector('head').appendChild(style)
          return Array.from(document.styleSheets).find((sh) => sh.href === null)
        })()
      return sheet ? sheet.insertRule(css, sheet.cssRules.length) >= 0 : false
    }
    // draggable 속성 해제
    unbindDraggable(elmnt: HTMLElement): void {
      const targetElement: HTMLElement = elmnt.querySelector('[' + dataDraggableHandle + ']') ?? elmnt
      targetElement.onmousedown = undefined
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
  class MessyPopupInstance implements Messi.PopupInstance {
    public popupInfo: Messi.PopupDataInfo
    private _config: Messi.DefaultPopupConfig
    public instanceConfig: Messi.DefaultPopupConfig
    
    private htmlUtil: HTMLElementUtil

    constructor() {
      this.htmlUtil = new HTMLElementUtil()
      this.popupInfo = {}
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
    
    addPopupInfo(id: string, el: Messi.PopupHTMLElement): void {
      this.popupInfo[id] = el
    }
    removePopupInfo(id: string): void {
      delete this.popupInfo[id]
    }

    // setConfig(customConfig: undefined): this
    // setConfig(customConfig: OptionalDefaultPopupConfig): this
    setConfig(customConfig: Messi.OptionalDefaultPopupConfig): this {
      const getDefinedValue = <T>(...args: Array<T | undefined>): T | undefined => args.find((arg) => arg !== undefined)
      // const wrapObj = function(key, value) {
      //   var _o = {}
      //   _o[key] = value
      //   return _o
      // }
      // const wrapObj = (k: string, v: any): object => ({ [k]: v })
      const defaultConfig: Messi.DefaultPopupConfig = this._config
      const currentConfig: Messi.DefaultPopupConfig = {
        root: getDefinedValue(customConfig?.root, defaultConfig.root),
        wrapper: getDefinedValue(customConfig?.wrapper, defaultConfig.wrapper),
        global: {
          draggable: getDefinedValue(customConfig?.global?.draggable, defaultConfig.global.draggable),
          style: {
            zIndex: getDefinedValue(customConfig?.global?.style?.zIndex, customConfig?.global?.zIndex /* 설정 alias */, defaultConfig.global.style.zIndex),

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

    createPopup(...popupConfigList: Array<Messi.PopupConfig>): this {
      const config: Messi.DefaultPopupConfig = this.instanceConfig
      const body: Element = document.querySelector(config.root)

      popupConfigList
        .filter((item) => item.id)
        .map((item: Messi.PopupConfig): [Messi.PopupHTMLElement, Messi.PopupConfig] => {
          const { id, wrapper, content, style = {} } = item
          const { zIndex: globalZIndex } = config.global

          const div: Messi.PopupHTMLElement = <Messi.PopupHTMLElement>(wrapper === undefined ? config.wrapper : this.htmlUtil.convertTextToElement(wrapper)).cloneNode(true)
          div.id = id
          div.classList.add(globalWrapperClassName)

          const contentDiv: Element = div.querySelector(`[${contentAttrName}]`) ?? (() => {
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
          div.style.zIndex = style?.zIndex || style?.['z-index'] || globalZIndex

          // FIXME: 테스트, wrapper의 최상위 자식 노드로 고정
          const child: HTMLElement = div.querySelector(`[${contentAttrName}] > *:first-child`)
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
        .map(([popup, item]: [Messi.PopupHTMLElement, Messi.PopupConfig]): Messi.PopupHTMLElement => {
          const getBooleanFunctionalValue = (...args: Array<(() => boolean) | boolean>) => {
            for (const arg of args) {
              const value = typeof arg === 'function' ? arg() : arg
              if ([true, false].includes(value)) return value
              // else continue
            }
          }
          const draggable: boolean = getBooleanFunctionalValue(item.draggable, config.global.draggable)
          const show: boolean = (() => {
            // 우선도에 따른 조회값(item.show, global.show, !item.hide, !global.hide, true)에 따라 리턴
            return getBooleanFunctionalValue(
              item.show,
              () => ([true, false].includes(item.hide) ? !item.hide : undefined),
              config.global.show,
              () => ([true, false].includes(config.global.hide) ? !config.global.hide : undefined),
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
    getPopup(id: string): Messi.PopupHTMLElement {
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
    forEach(fn: ([id, el]: [string, Messi.PopupHTMLElement], i: number, arr: Array<[string, Messi.PopupHTMLElement]>) => void): this {
      Object.entries(this.popupInfo).forEach(function ([id, el]: [string, Messi.PopupHTMLElement], i: number, arr: Array<[string, Messi.PopupHTMLElement]>) {
        fn.apply(this, [el, id, i, arr])
      })
      return this
    }
    noConflict(w: typeof globalThis): this {
      delete w[vname]
      return this
    }

    
    // deprecated
    // config(customConfig: undefined): this
    // config(customConfig: OptionalDefaultPopupConfig): this
    config(customConfig: Messi.OptionalDefaultPopupConfig): this {
      return this.setConfig(customConfig)
    }
  }
  const MessyPopup = new MessyPopupInstance()
  MessyPopup.init()

  // w && (w[vname] = MessyPopup)
  if (typeof module === 'undefined') {
    // global bind
    // var w = typeof global !== 'undefined' ? global : window
    const w: typeof globalThis = typeof global !== 'undefined' ? global : window
    w[vname] = MessyPopup
  } else {
    // module.exports bind
    module.exports = MessyPopup
    // module.exports.default = MessyPopup
  }
})(
  ((): Document | null => {
    try {
      return document
    } catch (e) {
      return null
    }
  })()
)
