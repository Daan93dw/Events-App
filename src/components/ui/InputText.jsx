import {
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { styles } from "../styles/styles";

function InputText({ name, type, placeholder, value, icon, changeFn }) {
  const input_styles = {
    ...styles.text_input,
    bg: useColorModeValue("blackAlpha.300", "whiteAlpha.300"),
  };

  return (
    <InputGroup>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeFn}
        {...input_styles}
      />
      <InputRightElement px={"8"}>{icon}</InputRightElement>
    </InputGroup>
  );
}

export default InputText;
