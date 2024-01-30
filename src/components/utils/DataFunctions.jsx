import { useSearchParams } from "react-router-dom";
import {
  PLACEHOLDER_IMG,
  PLACEHOLDER_USER,
  useEventsAppContext,
} from "./EventsAppContext";

// Function that matches the categories with the the categoryIds provided in the event object
export const getCategories = (categorieIds) => {
  const { data } = useEventsAppContext();
  const eventCategories = [];
  data.categories.forEach((c) => {
    if (categorieIds.includes(c.id)) {
      eventCategories.push(c);
    }
  });
  return eventCategories;
};

// Function that filters the events based on search and selected filter
export const getFilteredEvents = (data) => {
  const [searchParams] = useSearchParams();

  let filter = "all";
  if (searchParams.get("filter")) {
    filter = searchParams.get("filter");
  }

  let search = "";
  if (searchParams.get("search")) {
    search = searchParams.get("search");
  }

  const filteredEvents = data.events
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (e) =>
        e.categoryIds.includes(Number(filter.slice(0, filter.indexOf("-")))) ||
        filter === "all"
    );

  return filteredEvents;
};

// Function that gets the date from the event startTime
export const getEventDate = ({ startTime }) => {
  const eventDate = startTime.slice(0, startTime.indexOf("T"));
  return eventDate;
};

// Function that gets the event start time and end time
export const getEventTime = ({ startTime, endTime }) => {
  const eventStart = startTime.slice(
    startTime.indexOf(":") - 2,
    startTime.indexOf(":") + 3
  );
  const eventEnd = endTime.slice(
    endTime.indexOf(":") - 2,
    endTime.indexOf(":") + 3
  );
  return { eventStart, eventEnd };
};

// Function that shortens the description for the Event Cards
export const getShortDesc = ({ description }) => {
  let shortDesc = description.slice(0, 40);
  if (shortDesc.length >= 40) {
    shortDesc = `${shortDesc}  ... `;
  }
  return shortDesc;
};

export const getEvent = (eventId, { events }) => {
  const event = events.find((e) => Number(e.id) === Number(eventId));
  if (!event) {
    return null;
  }
  return event;
};

export const getEventCreator = (event, { users }) => {
  const eventCreator = users.find(
    (u) => Number(u.id) === Number(event.createdBy)
  );
  if (event.createdBy === 0) {
    return PLACEHOLDER_USER;
  }
  return eventCreator;
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNewId = (arr) => {
  let highestId = 0;
  arr.forEach((i) => {
    if (highestId < i.id) {
      highestId = i.id;
    }
  });
  return highestId + 1;
};

export const fixDates = (data) => {
  const fixedEvents = data.map((e) => {
    const newStartTime = e.startTime.slice(0, e.startTime.indexOf(":") + 3);
    const newEndTime = e.startTime.slice(0, e.startTime.indexOf(":") + 3);
    return { ...e, startTime: newStartTime, endTime: newEndTime };
  });
  return fixedEvents;
};

export const updateNewEvent = (prev, name, value, checked) => {
  if (name === "category") {
    if (checked) {
      return { ...prev, categoryIds: [...prev.categoryIds, Number(value)] };
    } else {
      const removeCategory = prev.categoryIds.filter((c) => c != Number(value));
      return { ...prev, categoryIds: removeCategory };
    }
  }
  if (name === "image" && value === "") {
    return {
      ...prev,
      image: PLACEHOLDER_IMG,
    };
  }
  return { ...prev, [name]: value };
};

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getActiveCategories = (data) => {
  let activeCategoryIds = [];
  data.events.forEach((event) => {
    event.categoryIds.forEach((id) => {
      if (!activeCategoryIds.includes(id)) {
        activeCategoryIds.push(id);
      }
      return;
    });
  });
  const activeCategories = data.categories.filter((c) => {
    return activeCategoryIds.includes(c.id);
  });

  return activeCategories;
};
