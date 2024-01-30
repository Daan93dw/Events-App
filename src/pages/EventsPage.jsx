import { Heading, Text } from "@chakra-ui/react";
import { useEventsAppContext } from "../components/utils/EventsAppContext";
import FindEvents from "../components/FindEvents";
import EventCard from "../components/EventCard";
import { getFilteredEvents } from "../components/utils/DataFunctions";
import { styles } from "../components/styles/styles";
import { CurrentState } from "../components/ui/CurrentState";

function EventsPage() {
  const { data, error, loading } = useEventsAppContext();

  const filteredEvents = getFilteredEvents(data);
  const { h1 } = styles;
  // Checking for Errors
  if (error) {
    console.log("error");
    return <CurrentState>We encountered an error. Sorry!</CurrentState>;
  }

  // Checking if the data is still loading
  if (loading) {
    return <CurrentState>Loading events ...</CurrentState>;
  }

  return (
    <>
      <FindEvents />
      <Heading {...h1}>list of events</Heading>
      {filteredEvents.length ? (
        <Text mb={"4"} align={"right"} color={"green"}>
          {filteredEvents.length} Events
        </Text>
      ) : (
        <Text mb={"4"} color={"red"}>
          No events
        </Text>
      )}
      {filteredEvents.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </>
  );
}

export default EventsPage;
