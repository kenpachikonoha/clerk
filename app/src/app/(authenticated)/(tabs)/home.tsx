import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors, defaultStyles } from "~/constants";

export default function Page() {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
        backgroundColor: Colors.lightGray,
      }}
    >
      <Text style={defaultStyles.sectionHeader}>Home</Text>


        <Text style={defaultStyles.sectionHeader}>Welcome!</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    height: 600,
    width: "100%",
  },
});
