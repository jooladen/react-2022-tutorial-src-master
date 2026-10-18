import './App.css';

// 왜: <header> 덩어리에 이름을 붙임. 이게 없으면 App 안에 HTML이 계속 길게 쌓인다.
// 이름은 대문자 시작 필수 — 소문자면 JSX가 HTML 태그로 해석한다.
function Header(){
  return <header>
    <h1><a href="/">WEB</a></h1>
  </header>
}
// 왜: 목록 영역을 분리. 지금은 내용이 고정이라 03번에서 데이터로 바꿀 대상이다.
function Nav(){
  return <nav>
    <ol>
      <li><a href="/read/1">html</a></li>
      <li><a href="/read/2">css</a></li>
      <li><a href="/read/3">javascript</a></li>
    </ol>
  </nav>
}
// 왜: 본문 영역을 분리. 02번에서 제목/본문을 바깥에서 받게 바꿀 대상이다.
function Article(){
  return <article>
    <h2>Welcome</h2>
    Hello, WEB
  </article>
}
function App() {
  // 왜: 이제 App은 "어떤 부품을 어떤 순서로 놓을지"만 말한다. 화면 구조가 한눈에 읽힌다.
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
