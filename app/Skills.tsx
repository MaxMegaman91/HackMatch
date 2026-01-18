import Slider from "@react-native-community/slider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import ProgressBar from "./ProgressBar";


const windowWidth = Dimensions.get('window').width;
const scaleFactor = windowWidth / 411;

type Skill = {
    name: string;
    expLevel: number;
    active: boolean;
    icon?: ImageSourcePropType;
}



export default function SkillsScreen() {
    const router = useRouter(); 
    
    const { name, email } = useLocalSearchParams<{
        name: string;
        email: string;
    }>();

    const [skills, setSkills] = useState<Skill[]>([
        { name: "Frontend", expLevel: 2, active: false, icon: require("../assets/skillIcons/frontend.png")},
        { name: "Backend", expLevel: 2, active: false, icon: require("../assets/skillIcons/backend.png") },
        { name: "Mobile Dev", expLevel: 2, active: false, icon: require("../assets/skillIcons/mobiledev.png") },
        { name: "Cloud / DevOps", expLevel: 2, active: false, icon: require("../assets/skillIcons/cloud.png") },
        { name: "AI / ML", expLevel: 2, active: false, icon: require("../assets/skillIcons/ai.png") },
        { name: "Design", expLevel: 2, active: false, icon: require("../assets/skillIcons/design.png") },
        { name: "Pitching", expLevel: 2, active: false, icon: require("../assets/skillIcons/pitching.png") },
        { name: "Project Management", expLevel: 2, active: false, icon: require("../assets/skillIcons/projectManagement.png") },
    ]);

    function nextPage() {
        router.push({
            pathname: "/Interests",
            params: {name, email, skills: JSON.stringify(skills)}
        })
    }

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text
            style={{
                fontSize: Math.min(scaleFactor*30, 48),
                fontWeight: "bold",
                textAlign: "left",
                lineHeight: 50, 
                //marginTop: 100
                marginBottom: Math.min(scaleFactor*10, 10)
            }}>Hi {name}!</Text>

            <Text
            style={{
                fontSize: Math.min(scaleFactor*18, 30),
                textAlign: "left",
                lineHeight: 50,
                marginBottom: 20
            }}>Choose your skills and experience levels!</Text>

            {skills.map((skill, index) => (
                <View
                    key={skill.name}
                    style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}
                    
                >
                    <Pressable
                        onPress={() => {
                            const copy = [...skills];
                            copy[index].active = !copy[index].active;
                            setSkills(copy);
                        }}
                        style={{ 
                            height: 40,
                        }}
                    >
                        {/*<Text
                            style={{
                            color: skill.active ? "#000" : "#aaa",
                            fontWeight: "600",
                            }}
                        >
                            {skill.name}
                        </Text>*/}

                        <Image
                            source={skill.icon}
                            style={{width: 40, height: 40, opacity: skill.active ? 1 : 0.4}}
                        />
                    </Pressable>

                    <Slider
                        style={{ width: Math.min(scaleFactor*250, 400), marginLeft: Math.min(scaleFactor*20, 40) }}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        disabled={!skill.active}
                        value={skill.expLevel}
                        onValueChange={(value: number) => {
                            const copy = [...skills];
                            copy[index].expLevel = value;
                            setSkills(copy);
                        }}
                        minimumTrackTintColor={skill.active ? "#005eff" : "#ccc"}
                        //maximumTrackTintColor="#ccc"
                        thumbTintColor={skill.active ? "#005eff" : "#aaa"}
                    />
                </View>
            ))}
        <Pressable
            style={({ pressed }) => [
                {
                width: Math.min(300*scaleFactor, 400),
                height: 45,
                backgroundColor: "#005eff",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
                },
            ]}
            onPress={nextPage}
            >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                Continue →
            </Text>
        </Pressable>
        <ProgressBar pageIndex={0} />
        </View>
    )
}