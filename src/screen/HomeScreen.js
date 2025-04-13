import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { requestPermissions } from "../utils/permissions";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  const [channelName, setChannelName] = useState("");
  const [userName, setUserName] = useState("");
  const [isHost, setIsHost] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const startCall = async () => {
    // Validate inputs
    if (!channelName.trim()) {
      Alert.alert("Error", "Please enter a valid interview room name");
      return;
    }

    if (!userName.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    // Request permissions
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) {
      Alert.alert(
        "Permission Required",
        "Camera and microphone permissions are required for video calls"
      );
      return;
    }

    // Navigate to call screen
    navigation.navigate("VideoCall", {
      channelName,
      userName,
      isHost,
      videoEnabled,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <MaterialIcons name="videocam" size={48} color="#4a69bd" />
            <Text style={styles.title}>Interview Session</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Interview Room Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter room name"
              value={channelName}
              onChangeText={setChannelName}
            />

            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={userName}
              onChangeText={setUserName}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Join as Interviewer</Text>
              <Switch
                value={isHost}
                onValueChange={setIsHost}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isHost ? "#4a69bd" : "#f4f3f4"}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Enable Video</Text>
              <Switch
                value={videoEnabled}
                onValueChange={setVideoEnabled}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={videoEnabled ? "#4a69bd" : "#f4f3f4"}
              />
            </View>

            <TouchableOpacity style={styles.joinButton} onPress={startCall}>
              <Text style={styles.joinButtonText}>
                {videoEnabled ? "Start Video Call" : "Start Audio Call"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2f3542",
    marginTop: 10,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2f3542",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: "#2f3542",
  },
  joinButton: {
    backgroundColor: "#4a69bd",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
