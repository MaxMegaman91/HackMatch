import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import ProgressBar from "./ProgressBar";



const InterestList = ["AI", "Startups", "Social Impact", "Health", "FinTech", "Gaming", "Web3", "Education", 
//    "Edge Computing", "Cybersecurity", "Digital Identity", 
//    "ClimateTech", "Civic Tech", "Gen. Art", "Assistive Tech", "IoT", "Data Viz", 
//    "Cloud Infra", "AgriTech", "PropTech", "AR/VR (XR)", "E-commerce", "MusicTech", "GovTech"
]

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleFactor = windowWidth / 411;

export default function InterestsScreen() {
    const router = useRouter(); 
    
    const { name, email, skills } = useLocalSearchParams<{
        name: string;
        email: string;
        skills: string
    }>();

    const [skillsToMatch, setSkillsToMatch] = useState<string[]>(InterestList);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matches, setMatches] = useState<string[]>([]);

    const [flash, setFlash] = useState<"none" | "pass" | "interested">("none");

    const handleDecision = (decision: "pass" | "interested") => {

        
        const skill = skillsToMatch[currentIndex];
        if (decision === "interested") {
            setMatches((prev) => [...prev, skill]);

            setFlash(decision);

            setTimeout(() => setFlash("none"), 500);
        } else if (decision === "pass") {
            setFlash(decision);
            setTimeout(() => setFlash("none"), 500);
            
        }

        if (currentIndex < skillsToMatch.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Alert.alert("Matching complete", `You liked ${matches.length} skills!`);
            router.push({
                pathname: "/Goals",
                params: {name, email, skills, interests: JSON.stringify(matches)}
            })
        }
    }

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text
            style ={{
                fontSize: 18,
                fontWeight: "600",
                textAlign: "center",
                flexShrink: 1,
                marginBottom: 20,
            }}
            >
                Filter topics you are interested in for this Hackathon!
            </Text>
            {skillsToMatch.length > 0 && (
                <View style={{ flexDirection: "row", height: 400, justifyContent: "center", alignItems: "center" }}>
                    
                    {/* Left half - Pass */}
                    <Pressable
                        style={{ width: windowWidth*0.3, backgroundColor: "#ff0000", opacity: 0.6, height: windowHeight*0.4, borderRadius: 10 }}
                        onPress={() => handleDecision("pass")}
                    >
                        <View style={{ flex: 1 }} />
                    </Pressable>

                    <Text style={{ flex: 1, textAlign: "center", margin: 30, fontSize: 20 }}>
                        {skillsToMatch[currentIndex]}
                    </Text>

                    {/* Right half - Interested */}
                    <Pressable
                        style={{ width: windowWidth*0.3, backgroundColor: "#00ff00", opacity: 0.6, height: windowHeight*0.4, borderRadius: 10 }}
                        onPress={() => handleDecision("interested")}
                    >
                        <View style={{ flex: 1 }} />
                    </Pressable>
                </View>
            )}

            <Text>
                {currentIndex+1} out of {skillsToMatch.length}
            </Text>

            {flash !== "none" && (
                <View style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                    fontSize: 48,
                    fontWeight: "bold",
                    color: flash === "pass" ? "red" : "green",
                    opacity: 0.5,
                    }}>
                    {flash === "pass" ? "NOPE" : "INTERESTED"}
                    </Text>
                </View>
            )}
            <View style={{marginTop: 50}}>
                <ProgressBar pageIndex={0 + currentIndex/(skillsToMatch.length-1)} />
            </View>
        </View>
    )
}