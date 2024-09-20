import { useAuth, useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Colors, defaultStyles } from "~/constants";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [isChecked, setChecked] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();
  const { signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const onSignIn = async (type: SignInType) => {
    switch (type) {
      case SignInType.Google: {
        try {
          const { createdSessionId, setActive } = await googleAuth();
          if (createdSessionId) {
            setActive!({ session: createdSessionId });
            router.navigate("./(authenticated)/(tabs)/home");
          }
          break;
        } catch (err) {
          console.error(err);
          break;
        }
      }
      case SignInType.Apple: {
        try {
          const { createdSessionId, setActive } = await appleAuth();
          if (createdSessionId) {
            setActive!({ session: createdSessionId });
            router.navigate("./(authenticated)/(tabs)/home");
          }
          break;
        } catch (err) {
          router.navigate("./(authenticated)/(tabs)/home");
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      router.navigate("./(authenticated)/(tabs)/home");
    }
  }, [isSignedIn]);

  return (
    <>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: "30%",
              backgroundColor: Colors.lightGray,
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>Continue with email </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: Colors.lightGray,
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>Continue with email </Text>
        </TouchableOpacity>


      </View>
    </KeyboardAvoidingView>

    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
export default Page;
