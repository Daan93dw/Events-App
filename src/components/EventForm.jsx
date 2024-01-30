import { FormControl, FormLabel, Checkbox, HStack } from "@chakra-ui/react";
import InputText from "./ui/InputText";
import { useEventsAppContext } from "./utils/EventsAppContext";
import { capitalizeWord } from "./utils/DataFunctions";

function EventForm({ changeFn, thisEvent }) {
  const { data } = useEventsAppContext();

  return (
    <>
      <FormControl isRequired my={"4"}>
        <FormLabel fontSize={"20px"}>Title</FormLabel>
        <InputText
          name="title"
          type="text"
          placeholder="Event title ..."
          value={thisEvent.title}
          changeFn={changeFn}
        />
      </FormControl>
      <FormControl isRequired my={"4"}>
        <FormLabel fontSize={"20px"}>Description</FormLabel>
        <InputText
          name="description"
          type="text"
          placeholder="Event description ..."
          value={thisEvent.description}
          changeFn={changeFn}
        />
      </FormControl>
      <FormControl my={"4"}>
        <FormLabel fontSize={"20px"}>Image</FormLabel>
        <InputText
          name="image"
          type="url"
          placeholder="Image url ..."
          // value={thisEvent.image}
          changeFn={changeFn}
        />
      </FormControl>
      <FormControl>
        {" "}
        <FormLabel>Category</FormLabel>
        <HStack
          display={"flex"}
          flexWrap={"wrap"}
          justifyItems={"start"}
          gap={"2"}
        >
          {data.categories.map((c) => {
            return (
              <Checkbox
                value={c.id}
                name={"category"}
                key={c.id}
                onChange={changeFn}
                isChecked={thisEvent.categoryIds.includes(c.id)}
                colorScheme="orange"
                size={"lg"}
                sx={{ marginInlineStart: "0px !important" }}
              >
                {capitalizeWord(c.name)}
              </Checkbox>
            );
          })}
        </HStack>
      </FormControl>
      <FormControl isRequired my={"4"}>
        <FormLabel fontSize={"20px"}>Location</FormLabel>
        <InputText
          name="location"
          type="text"
          placeholder="Event location ..."
          value={thisEvent.location}
          changeFn={changeFn}
        />
      </FormControl>
      <FormControl isRequired my={"4"}>
        <FormLabel fontSize={"20px"}>Start time</FormLabel>
        <InputText
          name="startTime"
          type="datetime-local"
          value={thisEvent.startTime}
          changeFn={changeFn}
        />
      </FormControl>
      <FormControl isRequired my={"4"}>
        <FormLabel fontSize={"20px"}>End time</FormLabel>
        <InputText
          name="endTime"
          type="datetime-local"
          value={thisEvent.endTime}
          changeFn={changeFn}
        />
      </FormControl>
    </>
  );
}

export default EventForm;
