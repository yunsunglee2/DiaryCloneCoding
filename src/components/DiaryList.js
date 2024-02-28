import { useState } from "react";

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
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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

  const getProcessDiaryList = () => {

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const filterCallBack = (item) => {
      if(filterType === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const copylist = JSON.parse(JSON.stringify(diarys));
    const filteredList = filterType === 'all' ? copylist : copylist.filter((item) => filterCallBack(item));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div>
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
      {getProcessDiaryList().map((diary) => (
        <div key={diary.id}>{diary.content}</div>
      ))}
    </div>
  );
};

export default DiaryList;
