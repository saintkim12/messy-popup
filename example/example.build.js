// Build With ES6
// import MessyPopup from './messy-popup'
// CommonJS
var MessyPopup = require('../build/messy-popup')

MessyPopup.setConfig({
  // wrapper: `
  //   <div>
  //     <div data-messy-content></div>
  //     <div>
  //       <input type="checkbox" /><span>오늘 하루는 이 창을 열지 않음</span>
  //     </div>
  //   </div>
  // `
})
MessyPopup.createPopup({
  id: 'test01',
  wrapper: `
    <div>
      <div data-messy-draggable-handle>
        <h2>headerheader</h2>
      </div>
      <div data-messy-content></div>
      <div>
        <input type="checkbox" /><span>오늘 하루는 이 창을 열지 않음</span>
      </div>
    </div>
  `,
  style: {
    right: '200px',
    top: '50px',
  },
  draggable: true,
  content: '<img src="./Octocat.png" />'
}, {
  id: 'test02',
  style: {
    right: '200px',
    top: '350px',
    width: '400px'
  },
  draggable: true,
  content: '<img src="./Octocat.png" />'
})
