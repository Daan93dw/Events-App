import { Box } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEventsAppContext } from "./utils/EventsAppContext";
import CategoryButton from "./ui/CategoryButton";
import { Search2Icon } from "@chakra-ui/icons";
import InputText from "./ui/InputText";
import { capitalizeWord, getActiveCategories } from "./utils/DataFunctions";

function FindEvents() {
  const { data } = useEventsAppContext();
  const [, setSearchParams] = useSearchParams();

  const handleChange = (e) => setSearchParams({ search: e.target.value });

  const activeCategories = getActiveCategories(data);

  return (
    <>
      {" "}
      <Box py={"4"}>
        {" "}
        <InputText
          placeholder={"Find event ... "}
          changeFn={handleChange}
          icon={<Search2Icon />}
        />
      </Box>
      <Box py={"4"}>
        <CategoryButton text={"All"} filter={"all"} />
        {activeCategories.map((c) => {
          return (
            <CategoryButton
              key={c.id}
              text={capitalizeWord(c.name)}
              filter={`${c.id}-${c.name}`}
            />
          );
        })}
      </Box>
    </>
  );
}

export default FindEvents;
