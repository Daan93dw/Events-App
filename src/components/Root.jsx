import React, { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { BASE_URL, useEventsAppContext } from "./utils/EventsAppContext";
import { fixDates } from "./utils/DataFunctions";

// styles

export const Root = () => {
  const bgOne = useColorModeValue("blackAlpha.300", "blackAlpha.200");
  const bgTwo = useColorModeValue("whiteAlpha.700", "blackAlpha.500");

  const { setData, setError, setLoading, displayToast } = useEventsAppContext();

  useEffect(() => {
    const paths = ["events", "categories", "users"];
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    paths.forEach((path) => {
      fetch(`${BASE_URL}${path}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          if (path === "events") {
            const fixedEvents = fixDates(data);
            setData((prev) => {
              return { ...prev, [path]: fixedEvents };
            });
          } else {
            setData((prev) => {
              return { ...prev, [path]: data };
            });
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch was aborted");
          } else {
            console.log("Something went wrong while fetching the data.");
            console.log(err);
            setError(err);
            displayToast("fetch", false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });

    return () => controller.abort();
  }, []);

  return (
    <Box align={"center"} bg={bgOne}>
      <Box
        maxW={"1200px"}
        minH={"100vh"}
        bg={bgTwo}
        p={{ base: "4", md: "12" }}
      >
        <Box py={"4"}>
          <Navigation />
        </Box>
        <Box py={"4"}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Root;
