import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useEffect, useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [currDate, setCurrDate] = useState(new Date());
  const [data, setData] = useState([]);
  const headText = `${currDate.getFullYear()}년 ${currDate.getMonth() + 1}월`;

  useEffect(() => {
    // 받은 다이어리 데이터 중 화면 출력되는 달에 맞는 다이어리만 보여주기 위한 함수 구현
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        1
      )

      const lastDay = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        0
      ).getTime();

      const isThisMonth = (date) => {
        if (firstDay <= date && date <= lastDay) {
          return true;
        }
        return false;
      };
      // ------------------------------------------------------------------
      const thisMonthDiary = diaryList.filter((diary) =>
        isThisMonth(diary.date)
      );
      setData(thisMonthDiary);
    }
  }, [currDate, diaryList]);

  const increaseMonth = () => {
    setCurrDate(
      new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        currDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setCurrDate(
      new Date(
        currDate.getFullYear(),
        currDate.getMonth() - 1,
        currDate.getDate()
      )
    );
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <MyHeader
        headtext={headText}
        leftchild={<MyButton onClick={decreaseMonth} text="<" />}
        rightchild={<MyButton onClick={increaseMonth} text=">" />}
      />
      <DiaryList diarys={data} />
    </div>
  );
};

export default Home;
