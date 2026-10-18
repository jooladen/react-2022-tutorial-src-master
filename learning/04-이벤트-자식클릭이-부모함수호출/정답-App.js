import './App.css';

function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      // 왜 preventDefault: 없으면 a 태그 기본 동작으로 페이지가 새로고침돼서 React가 처음부터 다시 시작된다.
      event.preventDefault();
      // 왜 props.onChangeMode(): 자식은 "클릭됐다"는 사실만 알린다. 무엇을 할지는 부모가 넘겨준 함수가 정한다.
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      {/* 왜 id 속성: 클릭된 a 태그가 몇 번 글인지 event.target.id로 꺼내기 위함 */}
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        // 왜 Number: 태그 속성에서 꺼낸 값은 항상 문자열 "1". 06번에서 숫자 id와 === 비교하려면 숫자여야 한다.
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
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
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]
  return (
    <div>
      {/* 왜 함수를 props로: 값(문자열)뿐 아니라 함수도 내려줄 수 있다. 자식이 이 함수를 부르면 신호가 부모로 올라온다. */}
      <Header title="WEB" onChangeMode={()=>{
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
