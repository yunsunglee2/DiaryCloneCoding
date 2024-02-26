import React, { useState, useRef, useContext } from "react";
import { myDispatchContext } from "./App";

const Main = () => {
  console.log('에디터 렌더')
  const [state, setState] = useState({
    author: '',
    content: "",
    emotion: 1,
  });
  const inputRef = useRef();
  const textareaRef = useRef();
  const inputNode = inputRef.current;
  const textareaNode = textareaRef.current;
  const { onCreate } = useContext(myDispatchContext);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!state.author.length) {
      alert("이름을 작성해주세요.");
      inputNode.focus();
      return;
    } else if (!state.content.length) {
      alert("내용을 작성해주세요.");
      textareaNode.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("일기를 저장하였습니다.");
    setState({
      author: '',
      content: '',
      emotion: '',
    })
  };

  return (
    <div className="main">
      <input
        name="author"
        ref={inputRef}
        onChange={handleChange}
        value={state.author}
        placeholder="이름을 입력해주세요."
      />
      <textarea
        name="content"
        ref={textareaRef}
        onChange={handleChange}
        value={state.content}
      />
      <div>
        <select name="emotion" value={state.emotion} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button onClick={handleSubmit}>일기 저장하기</button>
    </div>
  );
};

export default React.memo(Main);
