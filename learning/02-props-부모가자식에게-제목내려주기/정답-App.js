import './App.css';

// 왜 props: 이게 없으면 제목이 다른 Header마다 컴포넌트를 새로 만들어야 한다.
function Header(props){
  return <header>
    {/* 왜 {}: 중괄호가 없으면 "props.title" 글자가 그대로 찍힌다 */}
    <h1><a href="/">{props.title}</a></h1>
  </header>
}
// Nav는 아직 고정. 목록은 문자열 하나가 아니라 "여러 개"라서 03번에서 배열로 다룬다.
function Nav(){
  return <nav>
    <ol>
      <li><a href="/read/1">html</a></li>
      <li><a href="/read/2">css</a></li>
      <li><a href="/read/3">javascript</a></li>
    </ol>
  </nav>
}
// 왜 props 2개: 나중에 글을 클릭하면 같은 Article로 html/css/javascript 본문을 바꿔 보여주기 위함.
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function App() {
  return (
    <div>
      {/* 왜: 값을 정하는 쪽은 부모(App). 데이터 흐름은 부모 → 자식, 한 방향 */}
      <Header title="WEB"></Header>
      <Nav></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
