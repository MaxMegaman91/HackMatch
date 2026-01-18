import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const scaleFactor = windowWidth / 411;

type ProgressBarProps = {
  pageIndex: number; // 0 = Skills, 1 = Interests, 2 = Goals
};

export default function ProgressBar({ pageIndex }: { pageIndex: number }) {
  const progressPercent = ((pageIndex + 1) / 3) * 100; 

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progressPercent}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: Math.min(scaleFactor * 300, 350),
    backgroundColor: "#626262",
    borderRadius: 5,
    marginVertical: 15,
    alignSelf: "center",
  },
  progress: {
    height: "100%",
    backgroundColor: "#005eff",
    borderRadius: 5,
  },
});
