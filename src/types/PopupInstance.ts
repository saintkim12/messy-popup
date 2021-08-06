namespace Messi {

  export type PopupDataInfo = {
    [id: string]: PopupHTMLElement
  }

  export interface PopupInstance {
    popupInfo: PopupDataInfo
    // _config: DefaultPopupConfig
    instanceConfig: DefaultPopupConfig

    init(): this
    setConfig(customConfig: undefined): this
    setConfig(customConfig: OptionalDefaultPopupConfig): this

    createPopup(...popupConfigList: Array<PopupConfig>): this
    getPopup(id: string): PopupHTMLElement
    show(id: string): this
    hide(id: string): this
    destroy(id: string): this
    destroyAll(): this
    setDraggable(id: string): this
    unsetDraggable(id: string): this
    unsetDraggableAll(): this
    getPopupCount(): number
    forEach(fn: ([id, el]: [string, PopupHTMLElement], i: number, arr: Array<[string, PopupHTMLElement]>) => void): this
    noConflict(w: typeof globalThis): this
    // deprecated
    config(customConfig: undefined): this
    config(customConfig: OptionalDefaultPopupConfig): this
  }
}
