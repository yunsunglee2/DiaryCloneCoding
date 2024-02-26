import { useReducer } from "react"

  const reducer = (state, action) => {
    switch(action.type) {
      case 1: return state + 1;
      case 10: return state + 10;
      case 1000: return state + 1000;
      case 100000: return state + 100000;
    }
  }

const Count = () => {
  const [count, dispatch] = useReducer(reducer, 1);

  return (
    <div>
      {count}
      <button onClick={()=> {
        dispatch({type: 1})
      }}>+1버튼</button>
    </div>
  )
}