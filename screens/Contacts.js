import { View, Text } from "react-native";
import React from "react";
import useContacts from "../hooks/useHooks";

export default function Contacts() {
  const contacts = useContacts();
  return (
    <View>
      <Text>{JSON.stringify(contacts)}</Text>
    </View>
  );
}
