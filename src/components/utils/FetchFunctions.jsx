import { BASE_URL } from "./EventsAppContext";

export const fetchDelete = (type, id, data) => {
  const newData = async () => {
    await fetch(`${BASE_URL}${type}/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return {
          ...data,
          events: data.events.filter((event) => event.id != id),
        };
      } else {
        return data;
      }
    });
  };
  // TODO: Add message to user that event was deleted
  // TODO: Error handling and checking if deleting was ok before removing it from data
  return newData;
};
