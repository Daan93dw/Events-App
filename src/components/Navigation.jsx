import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "./ui/CustomButton";
import { useEventsAppContext } from "./utils/EventsAppContext";
import { useColorMode } from "@chakra-ui/react";
useEventsAppContext;
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <li>
          <Link to="/">
            <CustomButton>Events</CustomButton>
          </Link>
        </li>
        <li>
          <Link to="/new">
            <CustomButton>New</CustomButton>
          </Link>
        </li>
        <li>
          <CustomButton clickFn={toggleColorMode}>
            {colorMode === "dark" ? "  Light" : "  Dark"}
            {colorMode === "dark" ? (
              <SunIcon ml={"3"} />
            ) : (
              <MoonIcon ml={"3"} />
            )}
          </CustomButton>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
