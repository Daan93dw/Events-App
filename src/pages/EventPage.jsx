import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  BASE_URL,
  PLACEHOLDER_USER,
  useEventsAppContext,
} from "../components/utils/EventsAppContext";
// import { getEventCreator } from "../components/utils/DataFunctions";
import { CustomPopOver } from "../components/ui/CustomPopOver";
import { useState } from "react";
import {
  capitalizeWord,
  getCategories,
  getEvent,
  getEventCreator,
  getEventDate,
  getEventTime,
} from "../components/utils/DataFunctions";
import { EditEventModal } from "../components/EditEventModal";
import { CategoryTag } from "../components/ui/CategoryTags";
import { CurrentState } from "../components/ui/CurrentState";
import { styles } from "../components/styles/styles";

export const loader = ({ params }) => {
  return { eventId: params.eventId };
};

export const EventPage = () => {
  const { eventId } = useLoaderData();
  const { data, setData, loading, error, setError, displayToast } =
    useEventsAppContext();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const { h1, event_page } = styles;
  const {
    body,
    image,
    date_time_section,
    content_section,
    footer_section,
    user_image,
  } = event_page;

  const event = getEvent(eventId, data);

  let eventCreator = PLACEHOLDER_USER;
  if (event && data.users.length != 0) {
    eventCreator = getEventCreator(event, data);
  }

  const handleDelete = () => {
    setDeleting(true);
    setError(null);
    fetch(`${BASE_URL}events/${eventId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setData((prev) => {
            return {
              ...prev,
              events: prev.events.filter((event) => event.id != eventId),
            };
          });
          console.log(`Successfully deleted event ${eventId}.`);
          displayToast("delete", true);
        } else {
          throw new Error("Unable to delete.");
        }
      })
      .then(() => {
        navigate("/");
        setDeleting(false);
      })
      .catch((e) => {
        console.log("Error: ");
        console.log(e);
        setDeleting(false);
        displayToast("delete", false);
      });
  };
  if (error) {
    return <CurrentState>We encountered an error. Sorry!</CurrentState>;
  }
  if (loading) {
    return <CurrentState>Loading event ...</CurrentState>;
  }
  if (!event) {
    return <CurrentState>Unable to find event #{eventId}</CurrentState>;
  }
  if (deleting) {
    return <CurrentState>Deleting events ...</CurrentState>;
  }

  return (
    <Box>
      <Box {...body}>
        <Image src={event.image} {...image} />{" "}
        <HStack {...date_time_section}>
          <Text>{getEventDate(event)}</Text>
          <Text>{event.location}</Text>
          <HStack>
            <Text>{getEventTime(event).eventStart}</Text>
            <Text>-</Text>
            <Text>{getEventTime(event).eventEnd}</Text>
          </HStack>
        </HStack>
        <Center {...content_section}>
          <VStack>
            <Heading {...h1}>{event.title}</Heading>
            <Center flexWrap={"wrap"}>
              {getCategories(event.categoryIds).map((c) => {
                return <CategoryTag key={c.id} text={capitalizeWord(c.name)} />;
              })}
            </Center>{" "}
          </VStack>
          <Text>{event.description}</Text>
          <Center>
            <Image src={eventCreator.image} {...user_image} />
            <Box textAlign={"start"}>
              <Text>Made by: </Text>
              <Text>{eventCreator.name}</Text>
            </Box>
          </Center>{" "}
        </Center>
        <Center {...footer_section}>
          <Box>
            <EditEventModal event={event} />
          </Box>
          <Box>
            {" "}
            <CustomPopOver clickFn={handleDelete}>Delete</CustomPopOver>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};
