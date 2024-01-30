import { Heading, Text, Box, Center, Image, WrapItem } from "@chakra-ui/react";
import {
  capitalizeWord,
  getCategories,
  getEventDate,
  getEventTime,
  getShortDesc,
} from "./utils/DataFunctions";
import { Link } from "react-router-dom";
import CategoryTag from "./ui/CategoryTags";
import { styles } from "./styles/styles";

const { event_card } = styles;

function EventCard({ event }) {
  const eventDate = getEventDate(event);
  const { eventStart, eventEnd } = getEventTime(event);
  const shortDesc = getShortDesc(event);
  const categories = getCategories(event.categoryIds);

  return (
    <Link to={`/event/${event.id}`}>
      <Center backgroundImage={event.image} {...event_card.bg}>
        <Center {...event_card.main} w={"100%"} justifyContent={"space-evenly"}>
          <Box w={{ base: "30%", md: "20%", lg: "15%" }}>
            <Image src={event.image} {...event_card.img} />
          </Box>
          <Center
            flexDir={{ base: "column", lg: "row" }}
            w={{ base: "100%", md: "70%" }}
            justifyContent={"space-between"}
            p="8"
            gap={"4"}
          >
            <Box textAlign={{ base: "center", lg: "start" }} w="100%">
              <Heading as="h2">{event.title}</Heading>
              <Text>{shortDesc}</Text>
              <WrapItem
                flexWrap={"wrap"}
                justifyContent={{ base: "center", lg: "start" }}
                mt={"4"}
              >
                {categories.map((c) => {
                  return (
                    <CategoryTag key={c.id} text={capitalizeWord(c.name)} />
                  );
                })}
              </WrapItem>
            </Box>
            <Box
              textAlign={{ base: "center", lg: "end" }}
              w="100%"
              fontSize={"18px"}
            >
              <Text my="2">{eventDate}</Text>
              <Text my="2">
                {eventStart} - {eventEnd}
              </Text>
            </Box>
          </Center>
        </Center>
      </Center>
    </Link>
  );
}

export default EventCard;
