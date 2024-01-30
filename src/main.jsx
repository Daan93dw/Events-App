import React from "react";
import ReactDOM from "react-dom/client";
import EventPage, { loader as EventLoader } from "./pages/EventPage";
import EventsPage from "./pages/EventsPage";
import Root from "./components/Root";
import { EventsAppContextProvider } from "./components/utils/EventsAppContext";
import NewEventPage from "./pages/NewEventPage";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: EventLoader,
      },
      {
        path: "/new",
        element: <NewEventPage />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode="theme.config.initialColorMode" />
    <EventsAppContextProvider>
      <RouterProvider router={router} />
    </EventsAppContextProvider>
  </ChakraProvider>
);
