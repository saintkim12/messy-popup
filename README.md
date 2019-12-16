# messy-popup
메인 사이트에 팝업을 덕지덕지 붙여야 할 때 도움이 되는 라이브러리입니다.

## Get Started
### Using CDN
```html
  <!-- CDN 주소.. 아직 없다 -->
  <script src="cdn//messy-popup.js"></script>
```
```js
  MessyPopup.config({
    // common, global config
  })
  MessyPopup.createPopup({
    id: 'messy01',
    content: '<div>Hello!</div>'
  })
```
### Using AMD(like requirejs)
### Using module(like webpack, parcel, ...)

## API
### MessyPopup 
| Name | Type | Return | Description |
|:----:|:-----|:------:|:------------|
| MessyPopup.config            | Object | - | 기본 설정을 정의 |
| MessyPopup.createPopup       | Array \| MessyPopup | 팝업을 생성 |
| MessyPopup.getPopup          | String | HTMLElement | id에 해당하는 팝업 Element를 얻는다 |
| MessyPopup.show              | String | MessyPopup | id에 해당하는 팝업을 노출 |
| MessyPopup.hide              | String | MessyPopup | id에 해당하는 팝업을 감춤 |
| MessyPopup.destroy           | String | MessyPopup | id에 해당하는 팝업을 삭제 |
| MessyPopup.destroyAll        | - | - | MessyPopup | 생성된 모든 팝업을 삭제 |
| MessyPopup.setDraggable      | String | MessyPopup | id에 해당하는 팝업의 draggable 설정 |
| MessyPopup.unsetDraggable    | String | MessyPopup | id에 해당하는 팝업의 draggable 해제 |
| MessyPopup.unsetDraggableAll | - | MessyPopup | 생성된 모든 팝업의 draggable 해제 |
| MessyPopup.getPopupCount     | - | Number | 현재 팝업의 개수 조회 |
| MessyPopup.forEach           | - | Function(Popup: HTMLElement, ID: String, index: Number) | 팝업을 loop하며 인자로 지정된 함수를 실행 |
| MessyPopup.noConflict        | - | MessyPopup | (global only) 전역 MessyPopup 객체를 삭제 |

### MessyPopup.config
| Name | Type | Default | Description |
|:----:|:-----|:--------|:------------|
| config.root             | String \| HTMLElement | 'body' | Root Element |
| config.wrapper          | String \| HTMLElement | <div></div> | Default Wrapping Element |
| config.global.hide      | Boolean | - | 초기 생성 시 팝업을 감추는 여부 |
| config.global.draggable | Boolean | true | 초기 생성 시 팝업 draggable 여부 |
| config.global.zIndex    | Number | 1000 | 기본 z-index |

### MessyPopup.createPopup
| Name | Type | Default | Description |
|:----:|:-----|:--------|:------------|
| id             | String | - | (필수) 팝업 및 element의 ID |
| wrapper         | String \| HTMLElement | - | 팝업을 감싸는 Element |
| content         | String \| HTMLElement | - | 팝업의 내용 |
| style      | Object | - | 팝업의 style(css) ['top', 'left', 'bottom', 'right', 'position', 'z-index', 'width', 'height'] |
| draggable | Boolean | false | 팝업 draggable 여부 |
| hide | Boolean \| Function | config.global.hide | 팝업 감춤 여부 |
| show | Boolean \| Function | - | 팝업 노출 여부(hide가 있을 경우 hide가 우선시됨) |

## View demo or Customize
```bash
git clone https://github.com/saintkim12/messy-popup.git
cd messy-popup
npm i
npm run serve
npm run build
```
