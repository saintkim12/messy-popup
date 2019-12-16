// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"messy-popup.js":[function(require,module,exports) {
var global = arguments[3];
var vname = 'MessyPopup';
var aname = 'messyPopup';
var dataDraggableHandle = 'data-messy-draggable-handle';
var globalWrapperClassName = 'messy-popup';
var popupInfo = {}; // CSS 삽입

var insertCss = function insertCss(css) {
  var sheet = window.document.styleSheets[0];
  return sheet ? sheet.insertRule(css, sheet.cssRules.length) || true : false;
};

var cssList = ['.messy-popup { background-color: #fff; }' // '.messy-popup [data-messy-content] { height: 100%; }'
];
cssList.forEach(insertCss);

var unbindDraggable = function unbindDraggable() {
  if (!this) return;
  var elmnt = this;
  var handleElement = elmnt.querySelector('[' + dataDraggableHandle + ']');

  if (handleElement) {
    // if present, the header is where you move the DIV from:
    handleElement.onmousedown = undefined;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = undefined;
  }
};

var bindDraggable = function bindDraggable() {
  if (!this) return;
  var elmnt = this; // from https://www.w3schools.com/howto/howto_js_draggable.asp

  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
  var handleElement = elmnt.querySelector('[' + dataDraggableHandle + ']');

  if (handleElement) {
    // if present, the header is where you move the DIV from:
    handleElement.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:
    // convert bottom to top

    if (elmnt.style.bottom) {
      elmnt.style.top = elmnt.offsetTop + 'px';
      elmnt.style.bottom = '';
    } // convert right to left


    if (elmnt.style.right) {
      elmnt.style.left = elmnt.offsetLeft + 'px';
      elmnt.style.right = '';
    }

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}; // utils


var getFunctionedValue = function getFunctionedValue(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var getDefinedOrNot = function getDefinedOrNot() {
  var args = Array.from(arguments);

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') return args[i];
  }

  return undefined; // return typeof v1 === 'undefined' ? v2 : v1
};

var convertSelectorToElement = function convertSelectorToElement(str) {
  return str && typeof str === 'string' ? document.querySelector(str) : str;
};

var convertTextToElement = function convertTextToElement(str) {
  if (str && typeof str === 'string') {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
  } else {
    return str;
  }
};

var addPopupInfo = function addPopupInfo(id, el) {
  popupInfo[id] = el;
};

var removePopupInfo = function removePopupInfo(id) {
  delete popupInfo[id];
};

var show = function show(el) {
  el.style.visibility = '';
  return el;
};

var hide = function hide(el) {
  el.style.visibility = 'hidden';
  return el;
};

var destroy = function destroy(id) {
  var el = popupInfo[id];
  removePopupInfo(id);
  return el.parentNode.removeChild(el);
};

var setDraggable = function setDraggable(id, unset) {
  unset = unset === false;
  var el = popupInfo[id];
  unset ? unbindDraggable.call(el) : bindDraggable.call(el);
};

var MessyPopup = {};
MessyPopup._config = {
  root: 'body',
  wrapper: function () {
    var div = document.createElement('div');
    return div;
  }(),
  global: {
    // hide: true,
    draggable: true,
    zIndex: 1000
  }
};

MessyPopup.config = function (o) {
  var wrapObj = function wrapObj(key, value) {
    var _o = {};
    _o[key] = value;
    return _o;
  };

  o = Object.keys(o).reduce(function (obj, key) {
    var _o = Object.assign({}, wrapObj(key, MessyPopup._config[key]), wrapObj(key, o[key]));

    return Object.assign(obj, _o);
  }, {});
  MessyPopup._config = Object.assign(MessyPopup._config, o); // console.log('MessyPopup._config', MessyPopup._config)
};

MessyPopup.createPopup = function () {
  if (Array.isArray(arguments[0])) {
    return MessyPopup.createPopup.apply(MessyPopup, arguments[0]);
  }

  var arg = Array.from(arguments);
  var body = document.querySelector(MessyPopup._config.root);
  arg.filter(function (item) {
    return item.id;
  }).map(function (item) {
    var id = item.id;
    var content = item.content;
    var style = item.style || {};
    var globalZIndex = MessyPopup._config.global.zIndex;
    var div = convertTextToElement(item.wrapper ? item.wrapper : MessyPopup._config.wrapper).cloneNode(true); // const div = document.createElement('div')

    div.id = id;
    div.classList.add(globalWrapperClassName);
    var contentDiv = div.querySelector('[data-messy-content]') || div;
    contentDiv.innerHTML = content;
    div.dataset[aname] = '' // div.dataset[aname + 'Id'] = id
    ;
    ['top', 'left', 'bottom', 'right', 'position', 'z-index'].forEach(function (name) {
      div.style[name] = style[name] || '';
    });
    div.style.position = div.style.position || 'absolute';
    div.style['z-index'] = div.style['z-index'] || globalZIndex // TEST
    ;
    ['width', 'height'].forEach(function (name) {
      var child = div.querySelector('[data-messy-content] > *:first-child');
      child && (child.style[name] = style[name] || '');
    });
    div.style.visibility = 'hidden';

    div.show = function () {
      return show(div);
    };

    div.hide = function () {
      return hide(div);
    };

    div.destroy = function () {
      return destroy(id);
    };

    div.setDraggable = function () {
      return setDraggable(id);
    };

    div.unsetDraggable = function () {
      return setDraggable(id, false);
    }; // console.log('div', div)


    addPopupInfo(id, div);
    return [div, item];
  }).map(function (arr) {
    var popup = arr[0];
    var item = arr[1];
    var draggable = getDefinedOrNot(getFunctionedValue(item.draggable), MessyPopup._config.global.draggable);

    var show = function (hide, show) {
      if (typeof hide === 'undefined') {
        if (typeof show === 'undefined') {
          // default value of hide or show
          return MessyPopup._config.global.hide !== true;
        }

        return !(show === false);
      } else {
        return !hide;
      }
    }(getFunctionedValue(item.hide), getFunctionedValue(item.show));

    body.appendChild(popup);
    if (draggable) popup.setDraggable();

    if (show) {
      popup.show();
    }

    return popup;
  });
  return MessyPopup;
};

MessyPopup.getPopup = function (id) {
  return popupInfo[id];
};

MessyPopup.show = function (id) {
  popupInfo[id].style.visibility = '';
  return MessyPopup;
};

MessyPopup.hide = function (id) {
  popupInfo[id].style.visibility = 'hidden';
  return MessyPopup;
};

MessyPopup.destroy = function (id) {
  destroy(id);
  return MessyPopup;
};

MessyPopup.destroyAll = function () {
  Object.keys(popupInfo).forEach(this.destroy);
};

MessyPopup.setDraggable = function (id) {
  popupInfo[id].setDraggable();
  return MessyPopup;
};

MessyPopup.unsetDraggable = function (id) {
  popupInfo[id].unsetDraggable();
  return MessyPopup;
};

MessyPopup.unsetDraggableAll = function () {
  Object.keys(popupInfo).forEach(this.unsetDraggable);
  return MessyPopup;
};

MessyPopup.getPopupCount = function () {
  return Object.keys(popupInfo).length;
};

MessyPopup.forEach = function () {
  var arg = arguments;
  Object.keys(popupInfo).forEach(function (id, i) {
    arg[0].apply(MessyPopup, [popupInfo[id], id, i]);
  });
}; // w && (w[vname] = MessyPopup)


if (typeof module === 'undefined') {
  // global bind
  var w = typeof global !== 'undefined' ? global : window;
  w && (w[vname] = MessyPopup);

  MessyPopup.noConflict = function () {
    // w && (w[vname] = undefined)
    w && delete w[vname];
    return MessyPopup;
  };
} else {
  // module.exports bind
  module.exports = MessyPopup;
  module.exports.default = MessyPopup;
}
},{}],"C:/Users/sikim/AppData/Roaming/nvm/v10.14.2/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3938" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/sikim/AppData/Roaming/nvm/v10.14.2/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","messy-popup.js"], null)
//# sourceMappingURL=/messy-popup.js.map