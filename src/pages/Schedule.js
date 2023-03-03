import React, { useEffect, useState } from "react";

import Scheduler, {
  AppointmentDragging,
  View,
} from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import "../assets/styles/schedule.css";
import Main from "../components/layout/Main";
import { Button, InputNumber, TimePicker } from "antd";
import { util } from "../public/util";
import moment from "moment";
import classNames from "classnames";
import { businessAccountController } from "../controllers/businessAccountController";
import { useSelector } from "react-redux";

const min = new Date(2023, 1, 21);

const max = new Date(2023, 1, 25);
const draggingGroupName = "appointmentsGroup";

export default function Schedule() {
  const [allSlots, setAllSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);
  const [slotDuration, setSlotDuration] = useState(20);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [daysChosen, setDaysChosen] = useState([]);
  let tempDaysOfWeek = util.getDaysOfWeekDates();
  const userData = useSelector((state) => state);

  const [times, setTimes] = useState({
    startTime: "09:00",
    endTime: "10:00",
  });
  useEffect(() => {
    let days = [];
    let keys = Object.keys(tempDaysOfWeek);
    for (let i = 0; i < keys.length; i++) {
      days.push(tempDaysOfWeek[keys[i]]);
    }
    setDaysOfWeek(days);
  }, []);
  function onAppointmentDrag(e) {
    // let tempMySlots = [...mySlots];
    // let tempStart = e.itemData.startDate;
    // let index = e.itemData.index;
    // tempMySlots[index].text = moment(tempStart).format("dd HH:mm");
    // setMySlots(tempMySlots);
    console.log(e.itemData);
    console.log(mySlots);
  }
  function onAppointmentRemove(e) {
    let tempMySlots = [...mySlots];
    let tempAllSlots = [...allSlots];

    const index = mySlots.indexOf(e.itemData);

    if (index >= 0) {
      tempMySlots.splice(index, 1);
      tempAllSlots.push(e.itemData);

      setAllSlots(tempAllSlots);
      setMySlots(tempMySlots);
    }
  }

  function onAppointmentAdd(e) {
    let tempAllSlots = [...allSlots];
    let tempMySlots = [...mySlots];

    const index = tempAllSlots.indexOf(e.fromData);

    if (index >= 0) {
      tempAllSlots.splice(index, 1);
      tempMySlots.push(e.itemData);
      setAllSlots(tempAllSlots);
      setMySlots(tempMySlots);
    }
  }

  function onListDragStart(e) {
    e.cancel = true;
  }

  function onItemDragStart(e) {
    e.itemData = e.fromData;
  }

  function onItemDragEnd(e) {
    if (e.toData) {
      e.cancel = true;
    }
  }
  function modifyTiming(key, value) {
    let temptimes = { ...times };
    temptimes[key] = value;
    setTimes(temptimes);
  }
  function fetchSlots() {
    if (daysChosen.length === 0) {
      alert("choose days");
      return;
    }
    let tempMySlots = [...mySlots];
    let keys = Object.keys(tempDaysOfWeek);
    let tempIndex = 0;
    for (let i = 0; i < daysChosen.length; i++) {
      let startTime =
        tempDaysOfWeek[keys[daysChosen[i]]] + " " + times.startTime;
      let endTime = tempDaysOfWeek[keys[daysChosen[i]]] + " " + times.endTime;
      let proceed = true;
      while (proceed) {
        let json = {
          index: tempIndex,
          text: "",
          startDate: "",
          endDate: "",
          allDay: false,
        };
        json.startDate = moment(startTime, "YYYY-MM-DD HH:mm").toString();
        json.endDate = moment(startTime, "YYYY-MM-DD HH:mm")
          .add(slotDuration, "minutes")
          .format("YYYY-MM-DD HH:mm")
          .toString();
        json.text = "Slot" + tempIndex;
        tempMySlots.push(json);
        tempIndex++;
        startTime = moment(startTime, "YYYY-MM-DD HH:mm").add(
          slotDuration,
          "minutes"
        );
        if (moment(startTime).isSameOrAfter(moment(endTime))) {
          proceed = false;
        }
      }
    }
    setMySlots(tempMySlots);
  }
  function addSlots() {
    let body = [];
    for (let i = 0; i < mySlots.length; i++) {
      body.push({
        slotDate: moment(mySlots[i].startTime).format("YYYY-MM-DD").toString(),
        slotStartTime: moment(mySlots[i].startDate)
          .format("YYYY-MM-DDTHH:mm:ss")
          .toString(),
        slotEndTime: moment(mySlots[i].endDate)
          .format("YYYY-MM-DDTHH:mm:ss")
          .toString(),
        serviceFk: 5,
      });
    }
    businessAccountController.setSchedule({
      businessAccountId: userData.businessAccountInfo.businessAccountId,
      body: body,
    });
  }
  return (
    <Main>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <InputNumber
            size="large"
            min={1}
            max={60}
            defaultValue={slotDuration}
            onChange={setSlotDuration}
          />
          <input
            type={"time"}
            value={times.startTime}
            onChange={(e) => modifyTiming("startTime", e.target.value)}
          />
          <input
            type={"time"}
            value={times.endTime}
            onChange={(e) => modifyTiming("endTime", e.target.value)}
          />
        </div>

        <div className="d-flex">
          {daysOfWeek.map((day, index) => {
            return (
              <div
                key={"day" + index}
                onClick={() => {
                  let tempDaysChosen = [...daysChosen];
                  let dayIndex = tempDaysChosen.findIndex((i) => i === index);
                  if (dayIndex < 0) {
                    tempDaysChosen.push(index);
                  } else {
                    tempDaysChosen.splice(dayIndex, 1);
                  }
                  setDaysChosen(tempDaysChosen);
                }}
                className={classNames("schedule-day", {
                  "chosen-schedule-day":
                    daysChosen.findIndex((i) => i === index) >= 0,
                })}
              >
                {moment(day).format("dd")}
              </div>
            );
          })}
          <Button type="primary" onClick={() => fetchSlots()}>
            Publish Slots
          </Button>
          <Button type="primary" onClick={() => addSlots()}>
            Add Slots
          </Button>
        </div>
      </div>
      <div className="d-flex w-100">
        <Draggable
          id="list"
          data="dropArea"
          group={draggingGroupName}
          onDragStart={onListDragStart}
        >
          {allSlots.map((task) => (
            <Draggable
              key={task.text}
              className="item dx-card dx-theme-text-color dx-theme-background-color"
              clone={true}
              group={draggingGroupName}
              data={task}
              onDragStart={onItemDragStart}
              onDragEnd={onItemDragEnd}
            >
              {task.text}
            </Draggable>
          ))}
        </Draggable>
        <Scheduler
          min={min}
          max={max}
          id="scheduler"
          dataSource={mySlots}
          defaultCurrentView="Vertical Grouping"
          startDayHour={9}
          maxAppointmentsPerCell={1}
          editing={true}
          crossScrollingEnabled={true}
          showAllDayPanel={false}
        >
          <View
            name="Weekly Schedule"
            type="week"
            groupOrientation="vertical"
            cellDuration={slotDuration}
          />
          <AppointmentDragging
            group={draggingGroupName}
            onRemove={onAppointmentRemove}
            onAdd={onAppointmentAdd}
            onDragEnd={onAppointmentDrag}
          />
        </Scheduler>
      </div>
    </Main>
  );
}
