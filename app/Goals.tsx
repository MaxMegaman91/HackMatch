import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ProgressBar from "./ProgressBar";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleFactor = windowWidth / 411;

export default function SkillsScreen() {
    const router = useRouter(); 
    
    const { name, email, skills, interests } = useLocalSearchParams<{
        name: string;
        email: string;
        skills: string;
        interests: string;
    }>();

    const [goalsResponse, onChangeGoalsResponse] = useState("");

    function matchmaker() {
        router.push({
            pathname: "/Matchmaker",
            params: {name, email, skills, interests, goals: goalsResponse}
        })
    } 

    return (
        <KeyboardAvoidingView
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text
            style={{
                fontSize: Math.min(scaleFactor*24, 30),
                textAlign: "center",
                lineHeight: 50, 
                margin: 20
            }}>Finally, what are you looking to gain from this hackathon? </Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeGoalsResponse}
                placeholder="Example: meet people, learn something new, ship a project, try to win"
                value={goalsResponse}
                multiline={true}
            />

            <Pressable
                disabled={goalsResponse.length <= 5}
                style={({ pressed }) => [
                    {
                    width: Math.min(300*scaleFactor, 400),
                    height: 45,
                    backgroundColor: (goalsResponse.length > 5) ? "#005eff" : "#aaaaaa",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed ? 0.8 : 1,
                    marginTop: 20,
                    },
                ]}
                onPress={matchmaker}
                >
                <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                    Continue
                </Text>
            </Pressable>
            <View style={{marginTop: 40}}>
                <ProgressBar pageIndex={1.5} />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 120, //windowHeight*0.2,
    width: Math.min(300*scaleFactor, 500),
    marginLeft: 5,
    marginVertical: 15,
    textAlignVertical: "top",
    borderWidth: 1,
    padding: 5,
  },
});