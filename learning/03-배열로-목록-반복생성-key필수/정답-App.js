import './App.css';

function Header(props){
  return <header>
    <h1><a href="/">{props.title}</a></h1>
  </header>
}
function Nav(props){
  // 왜 lis 배열: JSX도 값이라 배열에 담을 수 있다. 담아 두면 {lis} 한 번으로 펼쳐서 그린다.
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    // 왜 key: 없으면 콘솔에 "Each child in a list should have a unique key" 경고.
    // 목록이 추가/삭제될 때 React가 항목을 구별하는 이름표다. id처럼 겹치지 않는 값을 쓴다.
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function App() {
  // 왜 배열을 App에 둠: 데이터를 가진 쪽이 부모여야 Nav와 Article(나중에 본문 표시)이 같이 쓸 수 있다.
  // 지금은 일반 const. 내용을 바꿔도 화면이 다시 그려지지 않는다 → 05번에서 state로 바꾼다.
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]
  return (
    <div>
      <Header title="WEB"></Header>
      {/* 왜 {}: 따옴표면 "topics"라는 글자가 넘어간다. 변수 값(배열)을 넘기려면 중괄호 */}
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
