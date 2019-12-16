const vname = 'MessyPopup'
const aname = 'messyPopup'
const dataDraggableHandle = 'data-messy-draggable-handle'
const globalWrapperClassName = 'messy-popup'
let popupInfo = {}

// CSS 삽입
const insertCss = function(css) {
  const sheet = window.document.styleSheets[0]
  return sheet ? (sheet.insertRule(css, sheet.cssRules.length) || true) : false
}
const cssList = [
'.messy-popup { background-color: #fff; }',
// '.messy-popup [data-messy-content] { height: 100%; }'
]
cssList.forEach(insertCss)

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
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// utils
const getFunctionedValue = function(arg) {
  return typeof arg === 'function' ? arg() : arg
}
const getDefinedOrNot = function() {
  var args = Array.from(arguments)
  for(let i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') return args[i]
  }
  return undefined
  // return typeof v1 === 'undefined' ? v2 : v1
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
  global: {
    // hide: true,
    draggable: true,
    zIndex: 1000
  }
}
MessyPopup.config = function(o) {
  const wrapObj = function(key, value) {
    var _o = {}
    _o[key] = value
    return _o
  }
  o = Object.keys(o).reduce(function(obj, key) {
    var _o = Object.assign({}, wrapObj(key, MessyPopup._config[key]), wrapObj(key, o[key]))
    return Object.assign(obj, _o)
  }, {})
  MessyPopup._config = Object.assign(MessyPopup._config, o)
  // console.log('MessyPopup._config', MessyPopup._config)
}
MessyPopup.createPopup = function() {
  if (Array.isArray(arguments[0])) {
    return MessyPopup.createPopup.apply(MessyPopup, arguments[0])
  }
  var arg = Array.from(arguments)
  const body = document.querySelector(MessyPopup._config.root)
  arg.filter(function(item) { return item.id }).map(function(item) {
    const id = item.id
    const content = item.content
    const style = item.style || {}
    const globalZIndex = MessyPopup._config.global.zIndex
    const div = convertTextToElement(item.wrapper ? item.wrapper : MessyPopup._config.wrapper).cloneNode(true)
    // const div = document.createElement('div')
    div.id = id
    div.classList.add(globalWrapperClassName)
    const contentDiv = div.querySelector('[data-messy-content]') || div
    contentDiv.innerHTML = content
    div.dataset[aname] = ''
    // div.dataset[aname + 'Id'] = id
    ;['top', 'left', 'bottom', 'right', 'position', 'z-index'].forEach(function(name) {
      div.style[name] = style[name] || ''
    })
    div.style.position = div.style.position || 'absolute'
    div.style['z-index'] = div.style['z-index'] || globalZIndex
    // TEST
    ;['width', 'height'].forEach(function(name) {
      const child = div.querySelector('[data-messy-content] > *:first-child')
      child && (child.style[name] = style[name] || '')
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
    const draggable = getDefinedOrNot(getFunctionedValue(item.draggable), MessyPopup._config.global.draggable)
    const show = (function(hide, show) {
      if (typeof hide === 'undefined') {
        if (typeof show === 'undefined') {
          // default value of hide or show
          return MessyPopup._config.global.hide !== true
        }
        return !(show === false)
      } else {
        return !hide
      }
    })(getFunctionedValue(item.hide), getFunctionedValue(item.show))
    body.appendChild(popup)
    if (draggable)
      popup.setDraggable()
    if (show) {
      popup.show()
    }
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
MessyPopup.forEach = function() {
  var arg = arguments
  ;Object.keys(popupInfo).forEach(function(id, i) {
    arg[0].apply(MessyPopup, [popupInfo[id], id, i])
  })
}
// w && (w[vname] = MessyPopup)
if (typeof module === 'undefined') {
  // global bind
  var w = typeof global !== 'undefined' ? global : window
  w && (w[vname] = MessyPopup)
  MessyPopup.noConflict = function() {
    // w && (w[vname] = undefined)
    w && (delete w[vname])
    return MessyPopup
  }
} else {
  // module.exports bind
  module.exports = MessyPopup
  module.exports.default = MessyPopup
}
