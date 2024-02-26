import React, { useRef, useEffect, useMemo, useCallback, useReducer } from "react";
import { Diary } from "./Diary";
import { DiaryList } from "./DiaryList";

const reducer = (state, action) => {
  switch(action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      const createdDate = new Date().getTime();
      const newItem = {
        ...action.data,
        createdDate
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((item) => item.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((item)=> 
        item.id === action.targetId ? {...item, content: action.newContent} : item
      )
    }
    default :
    return state;

  }
}

export const myContext = React.createContext();
export const myDispatchContext = React.createContext();

function App() {
  // const [dumyList, setDumyList] = useState([]);
  const [dumyList, dispatch] = useReducer(reducer, [])
  const dataRef = useRef(0);
  
  const getComments = async () => {
    const comments = await (
      await fetch("https://jsonplaceholder.typicode.com/comments")
    ).json();
    const initialData = comments.slice(0, 20).map((item) => {
      return {
        author: item.email,
        id: dataRef.current++,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date().getTime(),
      };
    });
    dispatch({type: 'INIT', data: initialData})
    // setDumyList(initialData);
  };

  useEffect(() => {
    getComments();
  }, []);

  const onCreate =  useCallback((author, content, emotion) => {
    dispatch({type: 'CREATE', data: { author, content, emotion, id: dataRef.current }})
    dataRef.current++;
  },[]);

  const onDelete = useCallback((targetId) => {
    dispatch({type: 'REMOVE', targetId})
    console.log(`${targetId}가 삭제되었습니다.`);
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: 'EDIT', targetId, newContent})
  }, []);

  const memoizedFncs = useMemo(()=>{
    return {onCreate, onDelete, onEdit}
  }, [])

  const diaryAnalyst = useMemo(() => {
    console.log('일기분석시작')
    const goodEmotionDiary = dumyList.filter((item) => item.emotion > 3).length
    const badEmotionDiary = dumyList.length - goodEmotionDiary;
    const goodRatio = goodEmotionDiary / dumyList.length;
    return {goodEmotionDiary, badEmotionDiary, goodRatio};
  },[dumyList.length])

  const {goodEmotionDiary, badEmotionDiary, goodRatio} = diaryAnalyst;

  return (
    <>
    <myContext.Provider value={dumyList}>
      <myDispatchContext.Provider value={memoizedFncs}>
        <div>
          <div>좋은 감정의 일기: {goodEmotionDiary}개</div>
          <div>안좋은 감점의 일기: {badEmotionDiary}개</div>
          <div>좋은 일기 비율: {goodRatio*100}%</div>
        </div>
          <Diary />
          <DiaryList />
        </myDispatchContext.Provider>
      </myContext.Provider>
    </>
  );
}

export default App;
