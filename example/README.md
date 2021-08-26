## UMD 사용법
### 1. 스크립트 로드
```html
<script src="{cdn}/build/messy-popup.umd.js"></script>
```

### 2. \<script> 작성
#### content로 구성된 팝업 작성
```js
// const MessyPopup = window.MessyPopup
MessyPopup
  .setConfig({/* 팝업 공통 설정 정의 */})
  /* 팝업을 생성/초기화 */
  .createPopup({
    id: 'my-text-messy-popup',
    content: 'hello'
  })
  .destroyAll()
  .createPopup({
    id: 'my-image-messy-popup',
    content: 'hello'
  })
```
