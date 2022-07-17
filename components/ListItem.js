import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import GlobalContext from "../context/Context";
import { Grid } from "react-native-easy-grid";

export default function ListItem({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
}) {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate("chat", { user, room, image })}
    >
      <Grid style={{ maxHeight: 80 }}></Grid>
    </TouchableOpacity>
  );
}
