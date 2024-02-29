import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import { Diary } from "./Diary";
import { DiaryList } from "./DiaryList";
import "./App.css";
import MyButton from "./components/button";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// 더미 리스트 생성
const dumyList = [
  {
    id: 1,
    emotion: 2,
    content: '오늘의 일기 1번',
    date: 1709011100915,
  },
  {
    id: 2,
    emotion: 3,
    content: '오늘의 일기 2번',
    date: 1709011200916,
  }, 
  {
    id: 3,
    emotion: 4,
    content: '오늘의 일기 3번',
    date: 1709011100917,
  },
  {
    id: 4,
    emotion: 5,
    content: '오늘의 일기 4번',
    date: 1709011100918,
  },
  {
    id: 5,
    emotion: 3,
    content: '오늘의 일기 5번',
    date: 1809011100915,
  },
  {
    id: 6,
    emotion: 2,
    content: '오늘의 일기 6번',
    date: 1909011100915,
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dumyList);
  const dataId = useRef(0);

  // CREATE 함수
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (date, content, emotion, targetId) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <div className="App">
      {/* <myContext.Provider value={dumyList}>
      <myDispatchContext.Provider value={memoizedFncs}>
        <div>
          <div>좋은 감정의 일기: {goodEmotionDiary}개</div>
          <div>안좋은 감점의 일기: {badEmotionDiary}개</div>
          <div>좋은 일기 비율: {goodRatio*100}%</div>
        </div>
          <Diary />
          <DiaryList />
        </myDispatchContext.Provider>
      </myContext.Provider> */}
      <MyButton
        type="positive"
        text="버튼"
        onClick={() => {
          alert("클릭!");
        }}
      />
      <MyButton
        type="negative"
        text="버튼"
        onClick={() => {
          alert("클릭!");
        }}
      />
      <MyButton
        type="default"
        text="버튼"
        onClick={() => {
          alert("클릭!");
        }}
      />
      <div>이곳은 홈 입니다</div>
      <div>App.js</div>
      <div>HOME</div>
    </div>
  );
}

export default App;
