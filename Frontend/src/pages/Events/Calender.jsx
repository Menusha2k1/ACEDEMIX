import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../../components/Features/eventSlice";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Navbar from "../../components/Navbar/navbar";


dayjs.extend(isBetween);

const Calendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", description: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date && newEvent.time) {
      dispatch(addEvent(newEvent));
      setShowAddModal(false);
      setNewEvent({ title: "", date: "", time: "", description: "" });
    }
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    if (selectedEvent.title && selectedEvent.date && selectedEvent.time) {
      dispatch(updateEvent(selectedEvent));
      setShowUpdateModal(false);
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(id));
    }
  };

  const generateCalendarDays = () => {
    const startOfMonth = dayjs().month(currentMonth).year(currentYear).startOf("month");
    const endOfMonth = dayjs().month(currentMonth).year(currentYear).endOf("month");

    const daysInMonth = [];
    let day = startOfMonth;

    while (!day.isAfter(endOfMonth, "day")) {
      daysInMonth.push(day);
      day = day.add(1, "day");
    }

    return daysInMonth;
  };

  const changeMonth = (direction) => {
    if (direction === "next") {
      setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
      setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    } else {
      setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
      setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    }
  };

  const filteredEvents = events.filter((event) =>
    dayjs(event.date).isBetween(
      dayjs().month(currentMonth).startOf("month"),
      dayjs().month(currentMonth).endOf("month"),
      "day",
      "[]"
    )
  );

  return (
    <div className={`p-6 mt-15 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`} 
    style={{
      backgroundImage: "url('/bg1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100%",
    }}
    >
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center">Event Calendar</h1>

      <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
      <i class="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;Add Event
      </button>

      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="w-14 h-8 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-700 shadow-md"></div>
          <span className="ml-3 text-lg font-medium">{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </label>
      </div>


      <div className="flex justify-between items-center my-6">
        <button onClick={() => changeMonth("prev")} className="bg-gray-300 px-4 py-2 rounded shadow text-black"><i class="fa-solid fa-backward"></i></button>
        <span className="text-xl font-semibold">{dayjs().month(currentMonth).year(currentYear).format("MMMM YYYY")}</span>
        <button onClick={() => changeMonth("next")} className="bg-gray-300 px-4 py-2 rounded shadow text-black"><i class="fa-solid fa-forward"></i></button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}

        {Array.from({ length: generateCalendarDays()[0].day() }).map((_, index) => (
          <div key={index} className="h-20" />
        ))}

        {generateCalendarDays().map((day) => (
          <div key={day} className="p-3 border-r border-b bg-gray-200 rounded-lg cursor-pointer text-black " onClick={() => setSelectedDate(day)}>
            <div className="text-center font-semibold">{day.date()}</div>
            {filteredEvents.filter((event) => dayjs(event.date).isSame(day, "day")).map((event) => (
              <div key={event._id} className="text-xs bg-blue-200 text-black-700 p-1 rounded mt-1">
              {event.title}
            </div>
            ))}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                required
              />
              <input
                type="date"
                value={newEvent.date}
                min={dayjs().format("YYYY-MM-DD")} // Prevent past dates
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                required
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                required
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              ></textarea>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Save</button>
                <button onClick={() => setShowAddModal(false)} className="bg-red-500 text-white px-4 py-2 rounded shadow">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-xl font-bold mb-4 text-center">{`Events on ${selectedDate.format("MMMM D, YYYY")}`}</h2>
            <ul className="space-y-4">
              {filteredEvents.filter((event) => dayjs(event.date).isSame(selectedDate, "day")).map((event) => (
                <li key={event._id} className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"} flex justify-between items-center`}>
                  <div className="flex flex-col">
                    <strong className="text-lg">{event.title}</strong>
                    <span className="text-sm text-gray-500">{event.time}</span>
                    <p className="text-sm mt-2">{event.description}</p>
                  </div>
                  <button
                    onClick={() => { setSelectedEvent(event); setShowUpdateModal(true); }}
                    className="text-blue-500 ml-2 bg-transparent border-none cursor-pointer hover:text-blue-700"
                  >
                  <i class="fa-solid fa-pen-to-square fa-xl"></i>edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="text-red-500 ml-2 bg-transparent border-none cursor-pointer hover:text-red-700"
                  >
                  <i class="fa-solid fa-trash fa-xl"></i>delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setSelectedDate(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


     {showUpdateModal && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
            <form onSubmit={handleUpdateEvent} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={selectedEvent.title}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                required
              />
              <input
                type="date"
                min={dayjs().format("YYYY-MM-DD")} // Prevent past dates
                value={selectedEvent.date ? dayjs(selectedEvent.date).format("YYYY-MM-DD") : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                required
              />
              <input
                type="time"
                value={selectedEvent.time}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                required
              />
              <textarea
                placeholder="Description"
                value={selectedEvent.description}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              ></textarea>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Save</button>
                <button onClick={() => setShowUpdateModal(false)} className="bg-red-500 text-white px-4 py-2 rounded shadow">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      

    </div>
  );
};

export default Calendar;