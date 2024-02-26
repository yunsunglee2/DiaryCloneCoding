import React, { useContext, useEffect, useRef, useState } from "react";
import './DiaryItem.css';
import { myDispatchContext } from "./App";

const DiaryItem = ({ item }) => {
  const [isEdit, setEdit] = useState(false);
  const [localContent, setLocalContent] = useState("");
  const textareaRef = useRef();
  const textareaNode = textareaRef.current;

  const { onDelete, onEdit } = useContext(myDispatchContext)

  useEffect(()=> {
    console.log(`${item.id}렌더링`)
  })
  

  const handleEdit = () => {
    setEdit(!isEdit);
    setLocalContent(item.content);
  };

  const handleTextarea = () => {
    if (localContent.length < 5) {
      alert("다섯글자 이상 작성해주세요");
      textareaNode.focus();
      return;
    }
    if (window.confirm(`${item.id}번의 일기를 수정하시겠습니까?`)) {
      onEdit(item.id, localContent);
      setEdit(!isEdit);
    }
  };

  return (
    <div className="diaryItem">
      {isEdit ? (
        <textarea
          ref={textareaRef}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
        />
      ) : (
        <div>
          <span>
            {item.author}가 {item.createdAt}에 {item.content}라고 인사했다.
          </span>
          <span>
            {item.author}의 감정은 {item.emotion}정도 인거 같다.
          </span>
          <button
            onClick={() => {
              console.log(item.id);
              onDelete(item.id);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
      {isEdit ? (
        <div>
          <button onClick={handleTextarea}>수정완료</button>
          <button onClick={handleEdit}>취소하기</button>
        </div>
      ) : (
        <button onClick={handleEdit}>수정하기</button>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);