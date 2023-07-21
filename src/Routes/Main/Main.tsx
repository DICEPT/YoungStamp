import { useState, useEffect } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import "@/Routes/Main/Main.scss";
import DailyChart from "@/Components/Chart/Daily/DailyChart";
import WeeklyChart from "@/Components/Chart/Weekly/WeeklyChart";
import MonthlyChart from "@/Components/Chart/Monthly/MonthlyChart";

export default function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [weekDropdownOpen, setWeekDropdownOpen] = useState(false);
  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
  const [activeMonth, setActiveMonth] = useState("선택없음");
  const [activeWeek, setActiveWeek] = useState("선택없음");
  const [activeDaily, setActiveDaily] = useState("선택없음");
  const [months, setMonths] = useState<string[]>([]);
  const [weeks, setWeeks] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentWeek = getWeekNumber(currentDate);

    // renderMonthButtons 부분의 months 버튼 리스트 자동으로 계산
    const monthsArray = ["선택없음"];
    for (let month = 1; month <= 12; month++) {
      const formattedMonth = `${currentYear}-${padNumber(month)}`;
      monthsArray.push(formattedMonth);
    }
    setMonths(monthsArray);

    // renderweeksButtons 부분의 weeks 버튼 리스트 자동으로 계산
    const weeksArray = ["선택없음"];
    for (let week = 1; week <= currentWeek; week++) {
      const formattedWeek = `${currentYear}-${padNumber(week)}`;
      weeksArray.push(formattedWeek);
    }
    setWeeks(weeksArray);

    // renderDayButtons 부분의 days 버튼 리스트 자동으로 계산
    const daysArray = ["선택없음"];
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDay = `${currentYear}-${padNumber(currentMonth)}-${padNumber(day)}`;
      daysArray.push(formattedDay);
    }
    setDays(daysArray);
  }, []);

  const padNumber = (number: number) => {
    return number.toString().padStart(2, "0");
  };

  const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInDay = 86400000;
    return Math.ceil(((date.valueOf() - oneJan.valueOf()) / millisecondsInDay + oneJan.getDay() + 1) / 7);
  };

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const toggleMonthDropdown = () => {
    setMonthDropdownOpen(!monthDropdownOpen);
  };

  const toggleWeekDropdown = () => {
    setWeekDropdownOpen(!weekDropdownOpen);
  };

  const toggleDayDropdown = () => {
    setDayDropdownOpen(!dayDropdownOpen);
  };

  const renderMonthButtons = () => {
    return (
      <ul className={`dropdown-menu${monthDropdownOpen ? " is-active" : ""}`}>
        {months.map((month, index) => (
          <li key={index}>
            <button
              className={activeMonth === month ? "is-active" : ""}
              onClick={() => {
                setActiveMonth(month);
                toggleMonthDropdown();
              }}
            >
              {month}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderWeekButtons = () => {
    return (
      <ul className={`dropdown-menu${weekDropdownOpen ? " is-active" : ""}`}>
        {weeks.map((week, index) => (
          <li key={index}>
            <button
              className={activeWeek === week ? "is-active" : ""}
              onClick={() => {
                setActiveWeek(week);
                toggleWeekDropdown();
              }}
            >
              {week}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderDayButtons = () => {
    return (
      <ul className={`dropdown-menu${dayDropdownOpen ? " is-active" : ""}`}>
        {days.map((daily, index) => (
          <li key={index}>
            <button
              className={activeDaily === daily ? "is-active" : ""}
              onClick={() => {
                setActiveDaily(daily);
                toggleDayDropdown();
              }}
            >
              {daily}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const tabContArr = [
    {
      tabTitle: (
        <li>
          <button className={activeIndex === 0 ? "is-active" : ""} onClick={() => tabClickHandler(0)}>
            {activeMonth === "선택없음" ? "월간" : activeMonth}
          </button>
        </li>
      ),
      tabCont: (
        <div className="contents">
          <MonthlyChart activeMonth={activeMonth} />
        </div>
      ),
      dropdownContent: activeIndex === 0 ? renderMonthButtons() : null,
      dropdownToggle: toggleMonthDropdown,
      isOpen: monthDropdownOpen
    },
    {
      tabTitle: (
        <li>
          <button className={activeIndex === 1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>
            {activeWeek === "선택없음" ? "주간" : activeWeek}
          </button>
        </li>
      ),
      tabCont: (
        <div className="contents">
          <WeeklyChart activeWeek={activeWeek} />
        </div>
      ),
      dropdownContent: activeIndex === 1 ? renderWeekButtons() : null,
      dropdownToggle: toggleWeekDropdown,
      isOpen: weekDropdownOpen
    },
    {
      tabTitle: (
        <li>
          <button className={activeIndex === 2 ? "is-active" : ""} onClick={() => tabClickHandler(2)}>
            {activeDaily === "선택없음" ? "일간" : activeDaily}
          </button>
        </li>
      ),
      tabCont: (
        <div className="contents">
          <DailyChart activeDaily={activeDaily} />
        </div>
      ),
      dropdownContent: activeIndex === 2 ? renderDayButtons() : null,
      dropdownToggle: toggleDayDropdown,
      isOpen: dayDropdownOpen
    }
  ];

  return (
    <div>
      <div className="daychart">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ul className="tabs is-boxed">
            {tabContArr.map((section) => section.tabTitle)}
          </ul>
          <div className="choose">
            <div className={`dropdown-wrapper${tabContArr[activeIndex].isOpen ? " is-active" : ""}`}>
              <button
                type="button"
                className={`dropdown-toggle${tabContArr[activeIndex].isOpen ? " is-active" : ""}`}
                onClick={tabContArr[activeIndex].dropdownToggle}
              >
                {activeMonth === "선택없음"
                  ? activeWeek === "선택없음"
                    ? activeDaily === "선택없음"
                      ? "선택없음"
                      : activeDaily
                    : activeWeek
                  : activeMonth}{" "}
                {tabContArr[activeIndex].isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              {tabContArr[activeIndex].dropdownContent}
            </div>
          </div>
        </div>
        <div>{tabContArr[activeIndex].tabCont}</div>
      </div>
      <div className="youtube">
        {/* 임시 내용 */}
        youtube
      </div>
    </div>
  );
}
