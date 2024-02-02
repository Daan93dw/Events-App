import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
} from "@chakra-ui/react";
import { CustomButton } from "./ui/CustomButton";
import { updateNewEvent } from "./utils/DataFunctions";
import { EventForm } from "./EventForm";
import { Form } from "react-router-dom";
import { useState } from "react";
import { BASE_URL, useEventsAppContext } from "./utils/EventsAppContext";
import { EditIcon } from "@chakra-ui/icons";

export const EditEventModal = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [saving, setSaving] = useState(false);
  const { data, setData, displayToast, setError } = useEventsAppContext();

  const toggleModal = () => {
    setSelectedEvent(event);
    onOpen();
  };

  const handleChange = (e) => {
    const target = e.target;
    setSelectedEvent((prev) => {
      return updateNewEvent(prev, target.name, target.value, target.checked);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const controller = new AbortController();

    fetch(`${BASE_URL}events/${selectedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEvent),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        const updatedEvents = data.events.map((e) => {
          if (json.id === e.id) {
            return json;
          }
          return e;
        });
        setData((prev) => {
          return {
            ...prev,
            events: updatedEvents,
          };
        });
        displayToast("edit", true);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          console.log("Something went wrong while editing the data.");
          console.log(err);
          setError(err);
          displayToast("edit", false);
        }
      })
      .finally(() => {
        setSaving(false);
        onClose();
      });
  };

  return (
    <>
      <CustomButton clickFn={toggleModal}>
        Edit Event
        <EditIcon ml={"3"} />
      </CustomButton>
      <Modal onClose={onClose} isOpen={isOpen} size={"lg"}>
        <ModalOverlay
          bg={"blackAlpha.500"}
          backdropFilter={"auto"}
          backdropBlur={"4px"}
        />
        <ModalContent>
          <ModalHeader bg={"blackAlpha.300"} color={"#ED8936"}>
            Edit Event
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Form onSubmit={handleSubmit}>
              <EventForm
                changeFn={handleChange}
                submitFn={handleSubmit}
                thisEvent={selectedEvent}
              />
              <Center gap={"8"} mt={"8"} mb={"4"}>
                <Button
                  isLoading={saving}
                  loadingText="Saving"
                  spinnerPlacement="start"
                  type="submit"
                  w={"50%"}
                  colorScheme="green"
                  borderRadius={"2px"}
                >
                  Save
                </Button>
                <Button w={"50%"} borderRadius={"2px"} onClick={onClose}>
                  Cancel
                </Button>
              </Center>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
