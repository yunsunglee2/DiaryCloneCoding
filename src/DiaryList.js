import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { myContext } from './App';

export const DiaryList = () => {
  const itemList = useContext(myContext);
  return (
    <div>
      <h2>일기 리스트</h2>
      <h3>총 {itemList.length}개의 일기가 있습니다.</h3>
      <div>
        {itemList.map((item) => (
        <DiaryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  itemList: [],
};