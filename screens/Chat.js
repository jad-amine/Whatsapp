// @refresh reset
import { View, Text } from "react-native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import GlobalContext from "../context/Context";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";

const randomId = nanoid();

export default function Chat() {
  const [roomHash, setRoomHash] = useState("");
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: currentUser.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type == "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        });
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
}
