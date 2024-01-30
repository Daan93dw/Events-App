const succesToastStyle = {
  title: "Succes",
  description: "It worked!",
  status: "success",
  position: "bottom-right",
  duration: 6000,
  isClosable: true,
};

const errorToastStyle = {
  title: "Error",
  description: "Something went wrong.",
  status: "error",
  position: "bottom-right",
  duration: 6000,
  isClosable: true,
};

export const toasts = {
  fetchSuccessToast: {
    ...succesToastStyle,
    description: "Events succesfully fetched",
  },
  fetchErrorToast: {
    ...errorToastStyle,
    description: "Unable to fetch events",
  },
  editSuccessToast: {
    ...succesToastStyle,
    description: "Event succesfully updated",
  },
  editErrorToast: {
    ...errorToastStyle,
    description: "Unable to edit the event",
  },
  createSuccesToast: {
    ...succesToastStyle,
    description: "Event succesfully created",
  },
  createErrorToast: {
    ...errorToastStyle,
    description: "Unable to create the event",
  },
  deleteSuccesToast: {
    ...succesToastStyle,
    description: "Event succesfully deleted",
  },
  deleteErrorToast: {
    ...errorToastStyle,
    description: "Unable to delete the event",
  },
};
