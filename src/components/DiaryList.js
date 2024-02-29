import { useState } from "react";
import MyButton from "./MyButton";
import { Link, useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];
const filterOptionList = [
  { value: "good", name: "좋은 기억" },
  { value: "bad", name: "안좋은 기억" },
  { value: "all", name: "전체" },
];

const ControlMenu = ({ value, optionLists, onChange }) => {
  return (
    <select className="controlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionLists.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diarys }) => {
  const [sortType, setSortType] = useState("latest");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  const getProcessDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const filterCallBack = (item) => {
      if (filterType === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const copylist = JSON.parse(JSON.stringify(diarys));
    const filteredList =
      filterType === "all"
        ? copylist
        : copylist.filter((item) => filterCallBack(item));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            optionLists={sortOptionList}
            onChange={setSortType}
          />
          <ControlMenu
            value={filterType}
            onChange={setFilterType}
            optionLists={filterOptionList}
          />
        </div>
        <div className="right_col">
          {/* <Link to={"/New"}> */}
          <MyButton
            type="positive"
            text="새일기쓰기"
            onClick={() => navigate("/New")}
          />
          {/* </Link> */}
        </div>
      </div>
      {getProcessDiaryList().map((diary) => (
        <DiaryItem key={diary.id} {...diary} />
      ))}
    </div>
  );
};

export default DiaryList;
