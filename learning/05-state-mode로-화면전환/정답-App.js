import './App.css';
// 왜 import: useState는 React가 주는 기능(Hook)이라 가져와야 쓸 수 있다.
import {useState} from 'react';

function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
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
  // 왜 useState: let mode = 'WELCOME' 으로 두고 mode = 'READ' 로 바꿔도 React는 모른다 → 화면 그대로.
  // useState는 [현재값, 바꾸는함수]를 준다. 바꾸는 함수(setMode)로 바꿔야 React가 App을 다시 실행해서 화면을 새로 그린다.
  const [mode, setMode] = useState('WELCOME');
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]
  // 왜 content 변수: mode에 따라 본문 자리에 들어갈 컴포넌트를 미리 골라 둔다. return 안을 단순하게 유지.
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    content = <Article title="Read" body="Hello, Read"></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        setMode('READ');
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
