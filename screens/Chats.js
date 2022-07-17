import { View, Text } from "react-native";
import React from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useContext } from "react";
import GlobalContext from "../context/Context";
import { useEffect } from "react";

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(GlobalContext);
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
      setRooms(parsedChats);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      <Text>Chats</Text>
    </View>
  );
}
