import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SegmentIcon from "@mui/icons-material/Segment";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const labelsClasses = ["white", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  function handleColourChange (e){
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: "green",
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(), 
    };
    dispatchCalEvent({type: "update", payload: calendarEvent});
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-gray-300 rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-400 px-4 py-2 flex justify-between items-center">
          <span className="fa fa-bars text-gray-900"></span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="fa fa-trash text-gray-900 cursor-pointer pr-1"
              ></span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="fa fa-times text-gray-900"></span>
            </button>
          </div>
        </header>
        <div className="p-3 text-gray-900">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-900 text-xl font-semibold pb-2 w-full border-b-2 bg-gray-300 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="text-gray-900">
              <ScheduleIcon />
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="text-gray-900">
              <SegmentIcon />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 bg-gray-300 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="text-gray-900">
              <BookmarkBorderIcon />
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  style={{ backgroundColor: lblClass }}
                >
                  {selectedLabel === lblClass && (
                    <span className="text-white text-sm">
                      <CheckIcon />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5 border-gray-400">
          
          <div className="flex justify-end w-2/3 ">
            <button
            type="submit"
            // onClick={handleSubmit}
            onClick={handleColourChange}
            className="bg-gray-300 hover:bg-green-400 rounded-2xl px-6 py-2 text-black border-2 border-gray-900"
          >
            Mark As Completed
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-gray-300 hover:bg-green-400 rounded-2xl px-6 py-2 text-black border-2 border-gray-900 ml-2"
          >
            Save
          </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
