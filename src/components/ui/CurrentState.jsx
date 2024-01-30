import { AbsoluteCenter, Center, Heading } from "@chakra-ui/react";
import { styles } from "../styles/styles";

export const CurrentState = ({ children }) => {
  const { current_state } = styles;
  return (
    <AbsoluteCenter w={"60%"}>
      <Center {...current_state}>
        <Heading fontWeight={"medium"}>{children}</Heading>
      </Center>
    </AbsoluteCenter>
  );
};
