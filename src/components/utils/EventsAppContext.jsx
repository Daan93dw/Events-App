import { useToast } from "@chakra-ui/react";
import { createContext } from "react";
import { useState, useContext } from "react";
import { toasts } from "./toasts";

export const BASE_URL = "http://localhost:3000/";
export const PLACEHOLDER_USER = {
  id: 0,
  name: "Anonymous",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
};
export const PLACEHOLDER_IMG =
  "https://img.freepik.com/premium-photo/organic-abstract-gradient-wallpaper-background-header-illustration_692702-9502.jpg";
export const EMPTY_EVENT = {
  createdBy: 0,
  title: "",
  description: "",
  image: PLACEHOLDER_IMG,
  categoryIds: [],
  location: "",
  startTime: "",
  endTime: "",
};

export const EventsAppContext = createContext();
EventsAppContext.displayName = "EventsAppContext";

// Context Provider
export const EventsAppContextProvider = ({ children }) => {
  const [data, setData] = useState({ events: [], categories: [], users: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState(EMPTY_EVENT);
  const toast = useToast();
  const {
    fetchSuccessToast,
    fetchErrorToast,
    editSuccessToast,
    editErrorToast,
    createSuccesToast,
    createErrorToast,
    deleteSuccesToast,
    deleteErrorToast,
  } = toasts;

  const displayToast = (action, status) => {
    switch (action) {
      case "fetch":
        status ? toast(fetchSuccessToast) : toast(fetchErrorToast);
        break;
      case "edit":
        status ? toast(editSuccessToast) : toast(editErrorToast);
        break;
      case "create":
        status ? toast(createSuccesToast) : toast(createErrorToast);
        break;
      case "delete":
        status ? toast(deleteSuccesToast) : toast(deleteErrorToast);
        break;
    }
  };

  const contextParams = {
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
    newEvent,
    setNewEvent,
    displayToast,
  };

  return (
    <EventsAppContext.Provider value={contextParams}>
      {children}
    </EventsAppContext.Provider>
  );
};

export const useEventsAppContext = () => {
  const context = useContext(EventsAppContext);
  if (!context) {
    throw new Error(
      "useEventsAppContext must be used within EventsAppContextProvider"
    );
  }
  return context;
};
