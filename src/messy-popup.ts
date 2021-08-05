((document: Document | null): void => {
  if (document as null) {
    // if not browser
    return
  }
  type PopupDataInfo = {
    [id: string]: MessyPopupHTMLElement
  }
  // type MessyPopupConfig = {
  //   _config: MessyPopupDefaultConfig
  //   config: Function
  // }
  type MessyPopupDefaultConfig = {
    root: string
    wrapper: HTMLElement
    global: MessyPopupDefaultGlobalConfig
  }
  type OptionalMessyPopupDefaultConfig = Partial<MessyPopupDefaultConfig>
  // & {
  //   root?: string
  //   wrapper?: HTMLElement
  //   global?: MessyPopupDefaultGlobalConfig
  // }
  // 공통 팝업 설정과 팝업별 설정의 공통값
  type MessyPopupOverlappedConfig = {
    draggable: boolean
    style: MessyPopupStyle
    show: boolean
    hide: boolean
  }
  type MessyPopupDefaultGlobalConfig = Partial<MessyPopupOverlappedConfig> & {
    // style.zIndex의 alias(설정시만 사용)
    zIndex?: string | number
  }

  type MessyPopupConfig = Partial<MessyPopupOverlappedConfig> & {
    id: string
    wrapper?: string
    content: string
  }

  type MessyPopupStyle = {
    top?: string | number
    left?: string | number
    bottom?: string | number
    right?: string | number
    position?: string
    zIndex?: string | number

    width?: string | number
    height?: string | number
  }

  class MessyPopupHTMLElement extends HTMLElement {
    show: () => HTMLElement
    hide: () => HTMLElement
    destroy: () => HTMLElement
    setDraggable: () => HTMLElement
    unsetDraggable: () => HTMLElement
  }

  //
  const contentAttrName = 'data-messy-content'
  const vname = 'MessyPopup'
  const aname = 'messyPopup'
  const dataDraggableHandle = 'data-messy-draggable-handle'
  const globalWrapperClassName = 'messy-popup'
  const popupInfo: PopupDataInfo = {}

  // CSS 삽입
  const insertCss = (css: string): boolean => {
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
  const cssList = [
    `.${globalWrapperClassName} { background-color: #fff; }`,
    // `.${globalWrapperClassName} [data-messy-content] { height: 100%; }`,
  ]
  cssList.forEach(insertCss)

  // draggable 속성 해제
  const unbindDraggable = function (elmnt: HTMLElement | null): void {
    if (elmnt as null) return
    const handleElement: HTMLElement | null = elmnt.querySelector('[' + dataDraggableHandle + ']')
    if (handleElement as HTMLElement) {
      // if present, the header is where you move the DIV from:
      handleElement.onmousedown = undefined
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = undefined
    }
  }
  // draggable 속성 연결
  const bindDraggable = function (elmnt: HTMLElement | null): void {
    if (elmnt as null) return

    // from https://www.w3schools.com/howto/howto_js_draggable.asp
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0
    const handleElement: HTMLElement | null = elmnt.querySelector('[' + dataDraggableHandle + ']')
    if (handleElement as HTMLElement) {
      // if present, the header is where you move the DIV from:
      handleElement.onmousedown = dragMouseDown
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown
    }

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

  // utils
  const convertTextToElement = function (str: string): Element {
    const div = document.createElement('div')
    div.innerHTML = str
    return div.firstElementChild
  }
  const addPopupInfo = function (id: string, el: MessyPopupHTMLElement): void {
    popupInfo[id] = el
  }
  const removePopupInfo = function (id: string): void {
    delete popupInfo[id]
  }
  const show = function (el: MessyPopupHTMLElement): MessyPopupHTMLElement {
    el.style.visibility = ''
    return el
  }
  const hide = function (el: MessyPopupHTMLElement): MessyPopupHTMLElement {
    el.style.visibility = 'hidden'
    return el
  }
  const destroy = function (id: string): MessyPopupHTMLElement {
    const el: MessyPopupHTMLElement = popupInfo[id]
    removePopupInfo(id)
    return el.parentNode.removeChild(el)
  }
  const setDraggable = function (id: string, unset?: boolean): MessyPopupHTMLElement {
    const set = unset !== false
    const el = popupInfo[id]
    // if (set) unbindDraggable.call(el)
    // else bindDraggable.call(el)
    set ? unbindDraggable.call(el, el) : bindDraggable.call(el, el)
    return el
  }

  const getDefinedValue = <T>(...args: Array<T | undefined>): T | undefined => args.find((arg) => arg !== undefined)

  class _MessyPopup {
    private _config: MessyPopupDefaultConfig
    public config: MessyPopupDefaultConfig

    constructor() {
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

    setConfig(customConfig: undefined): this
    setConfig(customConfig: OptionalMessyPopupDefaultConfig): this
    setConfig(customConfig: OptionalMessyPopupDefaultConfig): this {
      // const wrapObj = function(key, value) {
      //   var _o = {}
      //   _o[key] = value
      //   return _o
      // }
      // const wrapObj = (k: string, v: any): object => ({ [k]: v })
      const defaultConfig: MessyPopupDefaultConfig = this._config
      const currentConfig: MessyPopupDefaultConfig = {
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
      this.config = currentConfig
      return this
    }

    createPopup(...popupConfigList: Array<MessyPopupConfig>): this {
      const config: MessyPopupDefaultConfig = this.config
      const body: Element = document.querySelector(config.root)

      popupConfigList
        .filter((item) => item.id)
        .map((item: MessyPopupConfig): [MessyPopupHTMLElement, MessyPopupConfig] => {
          const { id, wrapper, content, style = {} } = item
          const { zIndex: globalZIndex } = config.global

          const div: MessyPopupHTMLElement = <MessyPopupHTMLElement>(wrapper === undefined ? config.wrapper : convertTextToElement(wrapper)).cloneNode(true)
          div.id = id
          div.classList.add(globalWrapperClassName)

          const contentDiv: Element = div.querySelector(`[${contentAttrName}]`) || div
          contentDiv.innerHTML = content
          div.dataset[aname] = ''
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
          div.show = () => show(div)
          div.hide = () => hide(div)
          div.destroy = () => destroy(id)
          div.setDraggable = () => setDraggable(id)
          div.unsetDraggable = () => setDraggable(id, false)

          addPopupInfo(id, div)
          return [div, item]
        })
        .map(([popup, item]: [MessyPopupHTMLElement, MessyPopupConfig]): MessyPopupHTMLElement => {
          const getBooleanFunctionalValue = (...args: Array<(() => boolean) | boolean>) => {
            for (const arg of args) {
              const value = typeof arg === 'function' ? arg() : arg
              if ([true, false].includes(value)) return value
              // else continue
            }
          }
          const draggable: boolean = getBooleanFunctionalValue(item.draggable, config.global.draggable)
          const show: boolean = (() => {
            // 우선도에 따른 조회값에 따라 리턴
            return getBooleanFunctionalValue(
              item.show,
              () => ([true, false].includes(item.hide) ? !item.hide : undefined),
              config.global.show,
              () => ([true, false].includes(config.global.hide) ? !config.global.hide : undefined),
              false
            )
          })()

          body.appendChild(popup)

          if (draggable) popup.setDraggable()
          if (show) popup.show()
          return popup
        })
      return this
    }
    getPopup(id: string): MessyPopupHTMLElement {
      return popupInfo[id]
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
      Object.keys(popupInfo).forEach(this.destroy)
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
      Object.keys(popupInfo).forEach(this.unsetDraggable)
      return this
    }
    getPopupCount(): number {
      return Object.keys(popupInfo).length
    }
    forEach(fn: ([id, el]: [string, MessyPopupHTMLElement], i: number, arr: Array<[string, MessyPopupHTMLElement]>) => void): this {
      Object.entries(popupInfo).forEach(function ([id, el]: [string, MessyPopupHTMLElement], i: number, arr: Array<[string, MessyPopupHTMLElement]>) {
        fn.apply(this, [el, id, i, arr])
      })
      return this
    }
    noConflict(w: typeof globalThis): this {
      delete w[vname]
      return this
    }
  }
  const MessyPopup = new _MessyPopup()

  // w && (w[vname] = MessyPopup)
  if (typeof module === 'undefined') {
    // global bind
    // var w = typeof global !== 'undefined' ? global : window
    const w: typeof globalThis = typeof global !== 'undefined' ? global : window
    w[vname] = MessyPopup
  } else {
    // module.exports bind
    module.exports = MessyPopup
    module.exports.default = MessyPopup
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
