import MyHeader from "../components/myHeader";
import { useState } from "react";

const Home = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const headText = `${currDate.getFullYear()}년 ${currDate.getMonth() + 1}일`
  
  return (
    <div>
      <MyHeader headtext={headText} />
    </div>
  )
}

export default Home;