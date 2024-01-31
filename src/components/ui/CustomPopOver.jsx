import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverArrow,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { CustomButton } from "./CustomButton";

export const CustomPopOver = ({ clickFn, children }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Box>
            <CustomButton clickFn={onToggle}>{children}</CustomButton>
          </Box>
        </PopoverTrigger>

        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              Are you sure you want to delete this event?
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody display={"flex"} gap={"2"}>
              <Button
                w={"50%"}
                colorScheme="red"
                borderRadius={"2px"}
                onClick={clickFn}
              >
                Yes, Delete
              </Button>
              <Button w={"50%"} borderRadius={"2px"} onClick={onClose}>
                Cancel
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};
