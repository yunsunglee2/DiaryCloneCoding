import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_descript: "완전 좋음",
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
  },
  {
    emotion_id: 2,
    emotion_descript: "좋음",
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
  },
  {
    emotion_id: 3,
    emotion_descript: "그럭저럭",
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
  },
  {
    emotion_id: 4,
    emotion_descript: "나쁨",
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
  },
  {
    emotion_id: 5,
    emotion_descript: "끔찍함",
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
  },
];
// --------------------------------------------------------------------
const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const textAreaRef = useRef();
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  console.log(date);
  const handleClick = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      textAreaRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate('/', { replace: true });
  };

  return (
    <div className="Editor">
      <MyHeader
        headtext="일기생성"
        leftchild={
          <MyButton
            text="뒤로가기"
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                onClick={handleClick}
                key={item.id}
                emotion_id={item.emotion_id}
                emotion_img={item.emotion_img}
                emotion_descript={item.emotion_descript}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <textarea
            ref={textAreaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘 하루에 대해 작성해보세요 *^^*"
          ></textarea>
        </section>
        <section>
          <div className="control_box">
            <MyButton text="취소하기" onClick={() => navigate(-1)} />
            <MyButton text="작성완료" type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
