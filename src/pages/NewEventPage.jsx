import { Button, Center, Heading, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { EventForm } from "../components/EventForm";
import { styles } from "../components/styles/styles";
import { updateNewEvent } from "../components/utils/DataFunctions";
import {
  BASE_URL,
  EMPTY_EVENT,
  useEventsAppContext,
} from "../components/utils/EventsAppContext";

export const NewEventPage = () => {
  const {
    setData,
    newEvent,
    setNewEvent,
    setLoading,
    loading,
    setError,
    displayToast,
  } = useEventsAppContext();
  const { h1, btn_light, btn_dark } = styles;
  const btn_styles = useColorModeValue(btn_light, btn_dark);

  useEffect(() => {
    setNewEvent(EMPTY_EVENT);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const target = e.target;
    setNewEvent((prev) => {
      return updateNewEvent(prev, target.name, target.value, target.checked);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${BASE_URL}events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((createdEvent) => {
        console.log("Succesfully created new event: ");
        setData((prev) => {
          return {
            ...prev,
            events: [...prev.events, createdEvent],
          };
        });
        navigate(`/event/${createdEvent.id}`);
        displayToast("create", true);
      })
      .catch((err) => {
        console.log("Something went wrong while fetching the data.");
        console.log(err);
        setError(err);
        displayToast("create", false);
      })
      .finally(() => {
        setNewEvent(EMPTY_EVENT);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Center minH={"30vh"}>
        <Heading>Loading event ... </Heading>
      </Center>
    );
  }

  return (
    <>
      <Heading {...h1}>CREATE NEW EVENT</Heading>
      <Form onSubmit={handleSubmit}>
        <EventForm
          changeFn={handleChange}
          submitFn={handleSubmit}
          thisEvent={newEvent}
        />
        <Center gap={"8"} mt={"6"} w={{ base: "100%", md: "300px" }}>
          <Button type="submit" w={"50%"} {...btn_styles}>
            Submit
          </Button>
          <Button
            type="reset"
            w={"50%"}
            {...btn_styles}
            onClick={() => setNewEvent(EMPTY_EVENT)}
          >
            Reset
          </Button>
        </Center>
      </Form>
    </>
  );
};
