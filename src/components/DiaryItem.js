import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, emotion, content, date}) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }

  return (
    <div className="diaryItem">
      <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="" />
      </div>
      <div className="info_section">
        <div className="date_wrapper">
          {new Date(parseInt(date)).toLocaleDateString()}
        </div>
        <div className="content_wrapper">{content.slice(0, 25)}</div>
      </div>
      <div className="button_section">
        <MyButton text={"수정하기"} onClick={goDetail} /> 
      </div>
    </div>
  )
}

export default DiaryItem;