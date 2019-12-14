
MessyPopup.config({
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
  content: '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />'
}, {
  id: 'test02',
  style: {
    right: '200px',
    top: '300px',
    width: '400px'
  },
  draggable: true,
  content: '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />'
})
