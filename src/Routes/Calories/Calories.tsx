import { useState } from "react";
import Calendar from "@/Components/Calendar/Calendar";
import RemoteDate from "@/Components/Calendar/RemoteDate";
import dayjs from "dayjs";
import ContentPost from "@/Components/Common/Content-post.tsx";

export default function Calories() {
  const [tab, setDealTab] = useState("curr");
  const [today, setToday] = useState(new Date().getDate());
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);

  let todayDate: string = `${whatYear}-${String(whatMonth).padStart(2, "0")}-${String(today).padStart(2, "0")}`;

  return (
    <>
      <div className="gender">
        <button
          type="button"
          className={`btn ${tab === "curr" ? "active" : ""}`}
          onClick={() => setDealTab("curr")}
        >
          남자 권장 칼로리
        </button>
        <button
          type="button"
          className={`btn ${tab === "prev" ? "active" : ""}`}
          onClick={() => setDealTab("prev")}
        >
          여자 권장 칼로리
        </button>
      </div>
      <ul>
        <li>탄수화물</li>
        <li>지방</li>
        <li>단백질</li>
      </ul>
      <button>
        {dayjs(`${whatYear}-${whatMonth}-${today}`).format("YYYY-MM-DD")}
      </button>
      <RemoteDate
        month={whatMonth}
        year={whatYear}
        setMonth={setWhatMonth}
        setYear={setWhatYear}
        backgroundColor={"var(--primary2)"}
      />
      <Calendar
        month={whatMonth}
        year={whatYear}
        today={today}
        setToday={setToday}
        setMonth={setWhatMonth}
        setYear={setWhatYear}
        category={"칼로리"}
        backgroundColor={"var(--primary1)"}
      />
      <ContentPost todayDate={todayDate} categoryName={"칼로리"}/>
    </>
  );
}
