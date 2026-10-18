# 강의 핵심 MECE — React는 4개 도구로 CRUD를 만든다

> 대상: 생활코딩 React 2022 개정판 (egoing) 완성 소스 `src/App.js`
> 원본 백업: `learning/00-완성본-정답지/App.js`
> 작성일: 2026-10-18

---

## 🎯 강의자의 아웃풋 (한 문장)

**"컴포넌트 · props · 이벤트 · state, 이 4개 도구만으로 글 목록 CRUD 웹앱을 만들 수 있다."**

이 강의를 다 들은 사람이 손에 쥐어야 하는 것은 "React 문법 전체"가 아닙니다. **이 4개 도구를 조합하는 감각**입니다.

---

## MECE 트리

```
A. 도구 4개 — React 문법 (서로 겹치지 않음)
   ├─ A1. 컴포넌트 — 나만의 태그를 만든다
   ├─ A2. props   — 부모 → 자식으로 값을 내린다
   ├─ A3. 이벤트  — 자식 → 부모로 함수를 호출한다 (함수를 props로 내려받아서)
   └─ A4. state   — 값이 바뀌면 화면이 다시 그려진다
                    └ 배열/객체 state는 복사해서 바꾼다 (불변성)

B. 응용 4개 — 도구를 조합한 기능 (CRUD)
   ├─ B1. Read   — id로 찾아서 보여준다
   ├─ B2. Create — form 입력 → 배열 복사 → 추가 → nextId 증가
   ├─ B3. Update — props를 state로 옮겨야 입력창 수정이 가능하다
   └─ B4. Delete — 해당 id만 빼고 새 배열을 만든다
```

**MECE 검증**
- **ME (겹침 없음)**: A는 "문법", B는 "그 문법으로 만든 기능"이라 층이 다르다. A1~A4는 각각 "무엇을 만드나 / 값이 어디로 내려가나 / 신호가 어디로 올라가나 / 언제 다시 그리나"로 질문이 다르다.
- **CE (빠짐 없음)**: `App.js`의 모든 코드가 아래 표 8칸 중 하나에 들어간다.

---

## 원본 코드 → MECE 매핑

| MECE | 원본에서 해당하는 곳 (이름으로 지칭) |
|---|---|
| A1 컴포넌트 | `Header`, `Nav`, `Article`, `Create`, `Update` 함수 선언 |
| A2 props | `Header`의 `title`, `Nav`의 `topics`, `Article`의 `title`/`body` |
| A3 이벤트 | `onChangeMode`, `onCreate`, `onUpdate` — 부모가 함수를 내려주고 자식이 `props.onXxx()`로 호출 |
| A4 state | `App`의 `mode`, `id`, `nextId`, `topics` (`useState`) |
| B1 Read | `mode === 'READ'` 분기 — `topics`에서 `id` 일치하는 글을 찾아 `Article`에 전달 |
| B2 Create | `Create` 컴포넌트 + `onCreate` 콜백 — `[...topics]` 복사 후 `push` |
| B3 Update | `Update` 컴포넌트 — props로 받은 `title`/`body`를 `useState` 초기값으로, `value` + `onChange` |
| B4 Delete | `contextControl` 안의 Delete 버튼 — `id`가 다른 것만 모아 새 배열 |

---

## 꼭 구분할 것: 강의용 단순화 vs 실무

강의자는 입문자를 위해 **일부러 쉬운 문법**을 씁니다. 본 따라하기는 강의자 방식대로 진행하고, 각 문제 끝에 "🔧 실무 버전"을 한 줄씩 덧붙입니다.

| 원본 코드 | 강의자 의도 (추정) | 실무 |
|---|---|---|
| `for` 문으로 목록 생성/검색/삭제 | `map`/`find`/`filter`를 몰라도 이해하도록 | `map`, `find`, `filter` |
| `let title, body = null;` | 간단히 선언 | ⚠️ `body`만 `null`, `title`은 `undefined`가 된다 |
| `Number(event.target.id)` | DOM에서 id 꺼내는 원리를 보여줌 | 클로저로 `t.id`를 바로 넘김 |
| `onUpdate` 안의 `console.log` | 수업 중 확인용 | 제거 |
| `import logo` (미사용) | CRA 템플릿 잔재 | 제거 (→ `npm-start-경고4종-...md` 참고) |

---

## 따라하기 커리큘럼

| # | 폴더 | 꽂을 한 문장 | MECE | 상태 |
|---|---|---|---|---|
| 01 | `01-컴포넌트-나만의태그-Header-Nav-Article` | 컴포넌트 = 이름 붙인 HTML 묶음 | A1 | ✅ |
| 02 | `02-props-부모가자식에게-제목내려주기` | 같은 컴포넌트에 다른 값을 넣는다 | A2 | ✅ |
| 03 | `03-배열로-목록-반복생성-key필수` | 데이터가 화면을 만든다 | A2 | ✅ |
| 04 | `04-이벤트-자식클릭이-부모함수호출` | 자식은 부모 함수를 props로 받아 부른다 | A3 | ✅ |
| 05 | `05-state-mode로-화면전환` | 일반 변수로는 화면이 안 바뀐다 | A4 | ✅ |
| 06 | `06-Read-id로-글찾아-보여주기` | state 2개(mode, id)로 화면 상태 결정 | B1 | ✅ |
| 07 | `07-Create-form입력-배열복사후추가` | 원본 배열을 고치면 화면이 안 바뀐다 | A4+B2 | ✅ |
| 08 | `08-Update1-수정화면진입-contextControl` | 상황별로 메뉴가 달라진다 | B3 | ✅ |
| 09 | `09-Update2-props를state로-입력가능하게` | props는 읽기 전용, 고치려면 state로 | B3 | ✅ |
| 10 | `10-Delete-해당id빼고-새배열` | 삭제도 결국 새 배열 만들기 | B4 | ✅ |

---

## 진행 방법

1. 각 폴더의 `문제.md`를 연다.
2. **📥 시작 코드**를 `src/App.js`에 통째로 붙여 넣는다.
3. `npm start`를 켜 두고 `// TODO` 빈칸을 채운다.
4. 🎯 목표 화면과 같아지면 → `정답-App.js`와 비교한다.
5. 🧠 셀프체크 질문에 **코드를 보지 않고 말로** 답한다. 답이 안 나오면 그 단계는 아직 끝나지 않은 것이다.

> 원본으로 되돌리려면: `learning/00-완성본-정답지/App.js`를 `src/App.js`에 복사.
