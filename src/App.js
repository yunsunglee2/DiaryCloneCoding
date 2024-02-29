import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pagess/Home";
import Diary from "./pagess/Diary";
import New from "./pagess/New";
import Edit from "./pagess/Edit";
import React, { useReducer, useRef } from "react";
import './App.css';

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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/New" element={<New />}></Route>
              <Route path="/Edit" element={<Edit />}></Route>
              <Route path="/Diary" element={<Diary />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
