import { useState } from "react";
import { Dimensions, Text, View } from "react-native";


const windowWidth = Dimensions.get('window').width;
const scaleFactor = windowWidth / 411;

export default function SkillsScreen() {
    const [page, setPage] = useState("");

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text
            style={{
                fontSize: Math.min(scaleFactor*30, 56),
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 50, 
                margin: 10
            }}>Hi</Text>
        </View>
    )
}