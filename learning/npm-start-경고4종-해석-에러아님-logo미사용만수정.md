# npm start 경고 4종 해석 — 에러 아님, logo 미사용 import만 수정

> 작성일: 2026-10-18
> 상황: CRA(react-scripts 5) 프로젝트에서 `npm start` 실행 → 화면은 정상인데 경고 메시지가 잔뜩 나옴

---

## 한 줄 결론

**에러 0건, 경고 1건.** 로그 끝의 `compiled with 1 warning`이 핵심. 실행에는 아무 영향 없음.
내 코드에서 고칠 것은 `src/App.js`의 안 쓰는 `logo` import **딱 하나**.

---

## 메시지 분류표

| # | 메시지 (키워드) | 종류 | 내 코드 문제? | 조치 |
|---|---|---|---|---|
| 1 | `'logo' is defined but never used` | ESLint 경고 | ✅ 예 | import 줄 삭제 |
| 2 | `Browserslist: caniuse-lite is outdated` | 안내 | ❌ 아니오 | 무시 (원하면 DB 업데이트) |
| 3 | `DEP_WEBPACK_DEV_SERVER_ON_AFTER/BEFORE_SETUP_MIDDLEWARE` | Node deprecation 경고 | ❌ 아니오 | 무시 (react-scripts 내부) |
| 4 | `assets by path ...`, `modules by path ...` | 빌드 결과 정보 | ❌ 아니오 | 그냥 정보 |

**판단 요령**: 로그 마지막 줄을 먼저 본다.
- `compiled successfully` → 깨끗함
- `compiled with N warning(s)` → 돌아감, 정리하면 좋음
- `Failed to compile` → 진짜 에러, 반드시 수정

---

## 1. `'logo' is defined but never used` — 유일하게 고칠 것

```
src\App.js
  Line 1:8:  'logo' is defined but never used  no-unused-vars
```

- 🟢 **초딩용**: 장난감 상자에서 블록을 꺼내 놓고 안 쓴 것. 선생님(ESLint)이 "꺼냈으면 쓰든지 다시 넣든지 해"라고 하는 것.
- 🔵 **개발자용**: CRA 기본 템플릿의 `<img src={logo}>`를 지우면서 import만 남은 상태. `no-unused-vars` 규칙에 걸림. 이 import 때문에 `logo.svg`가 번들에 포함되지만(`static/media/logo...svg 2.57 KiB`) 동작에는 영향 없음.

**조치** — 아래 줄 삭제. 남겨두면 경고가 계속 뜨고 안 쓰는 svg가 번들에 들어간다.

```js
import logo from './logo.svg';   // ← 삭제
```

> 메시지 읽는 법: `Line 1:8` = 1번째 줄 8번째 글자. `no-unused-vars` = 걸린 ESLint 규칙 이름 (검색 키워드).

---

## 2. `Browserslist: caniuse-lite is outdated`

- 🟢 **초딩용**: "어떤 브라우저가 어떤 기능을 지원하는지" 적힌 사전이 오래됐다는 알림.
- 🔵 **개발자용**: autoprefixer와 babel이 참고하는 브라우저 지원 DB(caniuse-lite)가 구버전이라는 뜻. 학습용이면 무시해도 된다.

없애고 싶다면:

```bash
npx update-browserslist-db@latest
```

> 로그에 나온 `npx browserslist@latest --update-db`는 **지금은 deprecated된 옛 명령**. 위 명령을 쓸 것.

---

## 3. `DEP_WEBPACK_DEV_SERVER_ON_..._MIDDLEWARE`

```
DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
```

- 🟢 **초딩용**: 장난감 회사가 "이 부품 곧 단종돼요"라고 미리 알려주는 것. 내가 산 부품이 아니라 공장 안에서 쓰는 부품.
- 🔵 **개발자용**: react-scripts 5가 webpack-dev-server 4의 옛 옵션을 쓰고 있어서 나는 경고. 내 코드와 무관하다. CRA는 사실상 유지보수가 끝나서 앞으로도 고쳐지지 않는다. **무시.**

---

## 4. `assets by path ...` 목록

번들 결과물 크기 리포트. 문제 아님. `bundle.js 1.49 MiB`가 큰 이유는 dev 모드라 압축과 최적화를 하지 않았기 때문이다. `npm run build`로 만들면 훨씬 작아진다.

---

## 배운 점 / 다음에 써먹을 것

1. **로그는 마지막 줄부터 읽는다.** error인지 warning인지부터 가른다.
2. **경고의 출처를 본다.** `src\...` 경로가 찍혀 있으면 내 코드, `(node:xxxx) DEP_...`처럼 나오면 라이브러리 내부.
3. **CRA는 2025년 공식 deprecated.** 튜토리얼 학습은 그대로 진행해도 되지만, 실전 신규 프로젝트는 **Vite** 또는 **Next.js**로 시작한다. 3번 같은 경고가 계속 쌓이는 근본 원인이 이것이다.
