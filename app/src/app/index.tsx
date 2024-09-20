import { useAuth } from "@clerk/clerk-expo";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Link, useRouter, useSegments } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, defaultStyles } from "~/constants";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro2.mp4")]);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const segments = useSegments();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  console.log("expoPushToken:", expoPushToken);
  console.log(notification);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const onAccessIn = () => {
    if (isSignedIn) {
      router.replace("/(authenticated)/(tabs)/home");
    }
  };


  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0]?.uri ?? "" }}
          style={styles.video}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link href={"/access"} style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]} asChild>
          <TouchableOpacity onPress={onAccessIn}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>Access it!</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});
export default Page;
