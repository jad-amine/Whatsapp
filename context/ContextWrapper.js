import React from "react";
import Context from "./Context";
import { theme } from "../utils";
import { useState } from "react";

export default function ContextWrapper(props) {
  const [rooms, setRooms] = useState([]);
  return (
    <Context.Provider value={{ theme, rooms, setRooms }}>
      {props.children}
    </Context.Provider>
  );
}
