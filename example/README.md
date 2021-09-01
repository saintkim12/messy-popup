## UMD 사용법
### 1. 스크립트 로드
```html
<script src="{cdn}/build/messy-popup.umd.js"></script>
```

### 2. \<script> 작성
#### content로 구성된 팝업 작성
```js
MessyPopup
  /* 팝업을 생성/초기화 */
  .createPopup({
    id: 'my-text-popup',
    content: /* 텍스트, html 텍스트, html element 지정 가능 */
      '************************************<br>\
        ************** hello ***************<br>\
        ************************************',
    style: {/* 컨텐츠를 감싼 div의 style을 지정 */
      top: '50px',
      right: '50px',
    }
  })
  .createPopup({
    id: 'my-image-popup',
    content: /* 텍스트, html 텍스트, html element 지정 가능 */
      '<img src="https://avatars.githubusercontent.com/u/45479131?v=4" />',
    style: {/* 컨텐츠를 감싼 div의 style을 지정 */
      top: '150px',
      right: '50px',
      width: '250px',
      height: '250px',
    }
  })
```
#### 공통 wrapper을 사용한 공통 설정 처리
```js
MessyPopup
  .setConfig({/* 팝업 공통 설정 정의 */
    wrapper: 
      '<div>\
          <div class="popup-header" data-messy-draggable-handle><!-- draggable handle이 있는 경우 드래그 대상이 해당 엘리먼트로 고정 -->\
            <h3>Draggable Header</h3>\
          </div>\
          <div data-messy-content> <!-- data-messy-content 속성이 있는 element에 (config.)content 내용이 삽입됨 -->\
            <!-- content 내용이 들어감 -->\
          </div>\
        </div>'
  })
  /* 팝업을 생성/초기화 */
  .createPopup({
    id: 'my-text-popup', /* 팝업의 id 및 DOM element id 설정 */
    content: /* 텍스트, html 텍스트, html element 지정 가능 */
      '************************************<br>\
      ************** hello ***************<br>\
      ************************************',
    style: {/* 컨텐츠를 감싼 div의 style을 지정 */
      top: '50px',
      right: '350px',
    }
  })
  .createPopup({
    id: 'my-image-popup', /* 팝업의 id 및 DOM element id 설정 */
    content: /* 텍스트, html 텍스트, html element 지정 가능 */
      '<img src="https://avatars.githubusercontent.com/u/45479131?v=4" />',
    style: {/* 컨텐츠를 감싼 div의 style을 지정 */
      top: '200px',
      right: '350px',
      width: '250px',
      height: '250px',
    }
  })
```

