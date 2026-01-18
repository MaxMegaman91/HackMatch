import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isPhone = (windowWidth < 420) ? true : false;
const scaleFactor = windowWidth / 411;

const TESTEMAILS = ["aarush.ar@gmail.com", "test1@gmail.com", "test999@yahoo.com"]


export default function RegistrationScreen() {
    const router = useRouter(); 
    const [name, onChangeName] = useState("");
    const [email, onChangeEmail] = useState("");
    const isFormValid = () => name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    function emailCheck() {
      let rawEmail = email.toLowerCase()
      if (TESTEMAILS.includes(rawEmail)) {
        router.push({
          pathname: "/Skills",
          params: {name, rawEmail}
        });
      } else {
        Alert.alert("User not found!", 
          "Sorry, it looks like you are not registered for this event.");
        onChangeName("");
        onChangeEmail("");
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
            style={{
                fontSize: Math.min(scaleFactor*30, 56),
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 50, 
                margin: 10
            }}>Welcome to HackMatch!</Text>

            <Text
            style={{
                fontSize: Math.min(scaleFactor*20, 40),
                textAlign: "center",
                margin: 10,
                marginBottom: 25
            }}>Please enter the following details!</Text>
    
            <View
            style={{
                flexDirection: "row", // makes children appear side by side
                alignItems: "center", // vertically center text and input
                marginBottom: 5,
            }}>
                <Text style={{fontSize: Math.min(scaleFactor*12, 24)}}>Name: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    placeholder="Enter name"
                    value={name}
                />
            </View>

            <View
            style={{
                flexDirection: "row", // makes children appear side by side
                alignItems: "center", // vertically center text and input
                marginBottom: 15,
            }}>
                <Text style={{fontSize: Math.min(scaleFactor*12, 24)}}>Email: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    placeholder="Enter email"
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>


            <Pressable
            disabled={!isFormValid()}
            style={({ pressed }) => [
                {
                width: Math.min(300*scaleFactor, 400),
                height: 45,
                backgroundColor: (isFormValid()) ? "#005eff" : "#aaaaaa",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
                marginTop: 20,
                },
            ]}
            onPress={emailCheck}
            >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                Continue →
            </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    width: Math.min(250*scaleFactor, 500),
    marginLeft: 5,
    marginVertical: 15,
    borderWidth: 1,
    padding: 5,
  },
});