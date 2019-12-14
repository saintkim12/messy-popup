(function(w) {
  const vname = 'MessyPopup'
  const aname = 'messyPopup'
  let count = 0

  let MessyPopup = {}
  MessyPopup._config = {
    root: 'body',
    wrapper: (function() {
      return ''
    })()
  }
  MessyPopup.config = function(o) {
    MessyPopup._config = Object.assign(MessyPopup._config, o)
  }
  MessyPopup.createPopup = function(...arg) {
    console.log('createPopup')
    const body = document.querySelector(MessyPopup._config.root)
    arg.filter(i => i).map(item => {
      const id = item.id
      const content = item.content
      const style = item.style || {}
      const div = document.createElement('div')
      div.id = id
      div.innerHTML = content
      div.dataset[aname] = ''
      div.style.position = 'fixed'
      ;['right', 'top'].forEach(function(name) {
        div.style[name] = style[name] || ''
      })
      div.style.visibility = 'hidden'
      console.log('div', div)
      return div
    }).map((popup, i) => {
      body.appendChild(popup)
      count++
      popup.style.visibility = ''
      return popup
    })
    return MessyPopup
  }
  MessyPopup.getPopupCount = function() {
    return count
  }

  w[vname] = MessyPopup
})(window)
MessyPopup.createPopup({
  id: 'test01',
  style: {
    right: '200px',
    top: '50px',
  },
  content: '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />'
}, {
  id: 'test02',
  style: {
    right: '200px',
    top: '240px',
  },
  content: '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />'
})
