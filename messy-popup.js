(function(w) {
  const vname = 'MessyPopup'
  const aname = 'messyPopup'
  const dataDraggableHandle = 'data-messy-draggable-handle'
  let popupInfo = {}

  const unbindDraggable = function() {
    if (!this) return
    const elmnt = this
    const handleElement = elmnt.querySelector('[' + dataDraggableHandle + ']')
    if (handleElement) {
      // if present, the header is where you move the DIV from:
      handleElement.onmousedown = undefined;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = undefined;
    }
  }
  const bindDraggable = function() {
    if (!this) return
    const elmnt = this

    // from https://www.w3schools.com/howto/howto_js_draggable.asp
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const handleElement = elmnt.querySelector('[' + dataDraggableHandle + ']')
    if (handleElement) {
      // if present, the header is where you move the DIV from:
      handleElement.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const convertSelectorToElement = function(str) {
    return str && typeof str === 'string' ? document.querySelector(str) : str
  }
  const convertTextToElement = function(str) {
    if (str && typeof str === 'string') {
      const div = document.createElement('div')
      div.innerHTML = str
      return div.firstElementChild
    } else {
      return str
    }
  }
  const addPopupInfo = function(id, el) {
    popupInfo[id] = el
  }
  const removePopupInfo = function(id) {
    delete popupInfo[id]
  }
  const show = function(el) {
    el.style.visibility = ''
    return el
  }
  const hide = function(el) {
    el.style.visibility = 'hidden'
    return el
  }
  const destroy = function(id) {
    const el = popupInfo[id]
    removePopupInfo(id)
    return el.parentNode.removeChild(el)
  }
  const setDraggable = function(id, unset) {
    unset = unset === false
    const el = popupInfo[id]
    unset ? unbindDraggable.call(el) : bindDraggable.call(el)
  }

  let MessyPopup = {}
  MessyPopup._config = {
    root: 'body',
    wrapper: (function() {
      const div = document.createElement('div')
      return div
    })(),
  }
  MessyPopup.config = function(o) {
    MessyPopup._config = Object.assign(MessyPopup._config, o)
  }
  MessyPopup.createPopup = function() {
    var arg = Array.from(arguments)
    const body = document.querySelector(MessyPopup._config.root)
    arg.filter(function(item) { return item.id }).map(function(item) {
      const id = item.id
      const content = item.content
      const style = item.style || {}
      const div = convertTextToElement(item.wrapper ? item.wrapper : MessyPopup._config.wrapper).cloneNode(true)
      // const div = document.createElement('div')
      div.id = id
      const contentDiv = div.querySelector('[data-messy-content]') || div
      contentDiv.innerHTML = content
      div.dataset[aname] = ''
      // div.dataset[aname + 'Id'] = id
      div.style.position = 'fixed'
      ;['top', 'right', 'bottom', 'left', 'width', 'height'].forEach(function(name) {
        div.style[name] = style[name] || ''
      })
      div.style.visibility = 'hidden'
      div.show = function() { return show(div) }
      div.hide = function() { return hide(div) }
      div.destroy = function() { return destroy(id) }
      div.setDraggable = function() { return setDraggable(id) }
      div.unsetDraggable = function() { return setDraggable(id, false) }
      // console.log('div', div)

      addPopupInfo(id, div)
      return [div, item]
    }).map((arr) => {
      const popup = arr[0]
      const item = arr[1]
      const draggable = item.draggable
      body.appendChild(popup)
      if (draggable)
        popup.setDraggable()
      popup.show()
      return popup
    })
    return MessyPopup
  }
  MessyPopup.getPopup = function(id) {
    return popupInfo[id]
  }
  MessyPopup.show = function(id) {
    popupInfo[id].style.visibility = ''
    return MessyPopup
  }
  MessyPopup.hide = function(id) {
    popupInfo[id].style.visibility = 'hidden'
    return MessyPopup
  }
  MessyPopup.destroy = function(id) {
    destroy(id)
    return MessyPopup
  }
  MessyPopup.destroyAll = function() {
    Object.keys(popupInfo).forEach(this.destroy)
  }
  MessyPopup.setDraggable = function(id) {
    popupInfo[id].setDraggable()
    return MessyPopup
  }
  MessyPopup.unsetDraggable = function(id) {
    popupInfo[id].unsetDraggable()
    return MessyPopup
  }
  MessyPopup.unsetDraggableAll = function() {
    Object.keys(popupInfo).forEach(this.unsetDraggable)
    return MessyPopup
  }
  MessyPopup.getPopupCount = function() {
    return Object.keys(popupInfo).length
  }
  MessyPopup.noConflict = function() {
    // w && (w[vname] = undefined)
    w && (delete w[vname])
    return MessyPopup
  }
  w && (w[vname] = MessyPopup)
  return MessyPopup
})(window)
