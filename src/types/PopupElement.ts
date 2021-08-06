
namespace Messi {
  export interface PopupHTMLElement extends HTMLElement {
    show: () => HTMLElement
    hide: () => HTMLElement
    destroy: () => HTMLElement
    setDraggable: () => HTMLElement
    unsetDraggable: () => HTMLElement
  }
}
