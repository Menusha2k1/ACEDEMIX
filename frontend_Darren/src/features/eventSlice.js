import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetching, adding, updating, and deleting events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await axios.get("http://localhost:8070/api/events");
  return res.data;
});

export const addEvent = createAsyncThunk("events/addEvent", async (event) => {
  const res = await axios.post("http://localhost:8070/api/events", event);
  return res.data;
});

export const updateEvent = createAsyncThunk("events/updateEvent", async (event) => {
  const res = await axios.put(`http://localhost:8070/api/events/${event._id}`, event);
  return res.data;
});

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id) => {
  await axios.delete(`http://localhost:8070/api/events/${id}`);
  return id;
});

// Slice with reducers
const eventSlice = createSlice({
  name: "events",
  initialState: { events: [], status: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map(event => 
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
