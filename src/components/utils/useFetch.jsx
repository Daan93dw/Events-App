import { useEffect } from "react";
import { useEventsAppContext } from "./EventsAppContext";
import { BASE_URL } from "./EventsAppContext";

function useFetch(path) {
  const { setData, setLoading, setError } = useEventsAppContext();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}${path}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setData((prev) => {
          return { ...prev, [path]: data };
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          console.log("Something went wrong while fetching the data.");
          console.log(err);
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [path]);
}

export default useFetch;
