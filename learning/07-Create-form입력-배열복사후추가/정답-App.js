import './App.css';
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
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      // 왜 preventDefault: form 제출의 기본 동작은 페이지 이동(새로고침)이다. 막지 않으면 state가 전부 날아간다.
      event.preventDefault();
      // 왜 name: event.target은 form 자신. input의 name 속성으로 form.title, form.body처럼 꺼낼 수 있다.
      const title = event.target.title.value;
      const body = event.target.body.value;
      // 왜 부모에게 넘김: topics는 App의 state. 자식(Create)은 입력값만 올려 보내고, 추가는 주인(App)이 한다.
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  // 왜 nextId state: 새 글 번호. 일반 let이면 App이 다시 실행될 때마다 4로 돌아가 id가 겹친다.
  const [nextId, setNextId] = useState(4);
  // 왜 topics를 state로: 글이 추가되면 Nav와 Article이 다시 그려져야 한다. const 배열은 다시 실행될 때마다 3개로 초기화된다.
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      // 왜 [...topics] 복사: topics.push 후 setTopics(topics)는 "같은 배열"을 넘기는 것이라
      // React가 "안 바뀌었네" 하고 다시 그리지 않는다. 새 배열을 만들어 넘겨야 바뀐 걸 안다 (불변성).
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      // 왜 READ + setId: 방금 만든 글을 바로 보여주기 위함 (사용자 경험)
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
      </ul>
    </div>
  );
}

export default App;
