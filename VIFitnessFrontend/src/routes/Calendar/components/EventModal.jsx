import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SegmentIcon from "@mui/icons-material/Segment";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAuth } from "@/hooks/AuthProvider";
import APIDataService from "@/services/APIDataService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const labelsClasses = ["white", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { user, setUser } = useAuth();
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.name : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  // const [selectedLabel, setSelectedLabel] = useState(
  //   selectedEvent
  //     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
  //     : labelsClasses[0]
  // );

  const [reload, setReload] = useState(0);

  useEffect(() => {
    console.log("reload");
  }, [reload])

  const handleDeleteExercise = async () => {
    e.preventDefault();
    const data = {
      email: user.email,
      date: selectedEvent.createdAt,
    };
    try {
      const response = await APIDataService.deleteExercise(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Exercise deleted!");

        // Set setShowEventModal to false after a 0.5-second delay
        setTimeout(() => {
          setShowEventModal(false);

          // Reload the page after 0.1 seconds
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 500);
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditWorkout = async (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      date: selectedEvent.createdAt,
      description: description,
    };
    try {
      const response = await APIDataService.editExercise(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Exercise updated!");
        window.location.reload(true)
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleMarkAsCompleted = async (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      date: selectedEvent.createdAt,
    };

    try {
      const response = await APIDataService.updateExercise(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Exercise mark as completed!");
        console.log("Test");
        window.location.reload(true)

        // Set setShowEventModal to false after a 0.5-second delay

      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (err) {
      console.log("test");
    }
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-gray-300 rounded-lg shadow-2xl w-1/4">
          <header className="bg-gray-400 px-4 py-2 flex justify-between items-center">
            <span className="fa fa-bars text-gray-900"></span>
            <div>
              {selectedEvent && (
                <span
                  onClick={handleDeleteExercise}
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
              {/* ////////////////// Title ////////////////// */}
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

              {/* ////////////////// Showing Date ////////////////// */}
              <span className="text-gray-900">
                <ScheduleIcon />
              </span>
              <p>{daySelected.format("dddd, MMMM DD")}</p>

              {/* ////////////////// Description ////////////////// */}
              <span className="text-gray-900">
                <SegmentIcon />
              </span>
              <input
                type="text"
                name="description"
                placeholder="E.g: 4 sets of 12 reps"
                value={description}
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 bg-gray-300 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* ////////////////// Color Label ////////////////// */}
              {/* <span className="text-gray-900">
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
              </div> */}
            </div>
          </div>
          <footer className="flex justify-end border-t p-3 mt-5 border-gray-400">

            <div className="flex justify-end w-2/3 ">
              {selectedEvent.isCompleted ? (
                <button
                  className="bg-gray-300 rounded-2xl px-6 py-2 text-black border-2 border-gray-900"
                  disabled
                >
                  Already marked as completed
                </button>
              ) : (
                <button
                  onClick={handleMarkAsCompleted}
                  className="bg-gray-300 hover:bg-green-400 rounded-2xl px-6 py-2 text-black border-2 border-gray-900"
                >
                  Mark As Completed
                </button>
              )}

              <button

                onClick={handleEditWorkout}
                className="bg-gray-300 hover:bg-green-400 rounded-2xl px-6 py-2 text-black border-2 border-gray-900 ml-2"
              >
                Save
              </button>
            </div>
          </footer>
        </form>
      </div>
    </>
  );
}
