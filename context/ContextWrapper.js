import React, { Children } from "react";
import Context from "./Context";
import { theme } from "../utils";

export default function ContextWrapper(props) {
  return (
    <Context.Provider value={{ theme }}>{props.Children}</Context.Provider>
  );
}
