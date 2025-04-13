import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AgoraUIKit from "agora-rn-uikit";
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from "react-native-agora";

const dummyMessages = [
  {
    id: "1",
    text: "Hey there! How are you doing today?",
    time: "10:30 AM",
    sender: "them",
  },
  {
    id: "2",
    text: "I'm doing great! Just finished that project we talked about.",
    time: "10:32 AM",
    sender: "me",
  },
  {
    id: "3",
    text: "That's fantastic! Could you send me the files when you have a moment?",
    time: "10:33 AM",
    sender: "them",
  },
  {
    id: "4",
    text: "Of course! I'll email them to you right away.",
    time: "10:35 AM",
    sender: "me",
  },
  {
    id: "5",
    text: "Also, are we still meeting for coffee tomorrow?",
    time: "10:36 AM",
    sender: "them",
  },
  {
    id: "6",
    text: "Yes, absolutely! 2pm at the usual place?",
    time: "10:38 AM",
    sender: "me",
  },
  {
    id: "7",
    text: "Perfect! Looking forward to it.",
    time: "10:39 AM",
    sender: "them",
  },
  {
    id: "8",
    text: "Me too! See you then.",
    time: "10:40 AM",
    sender: "me",
  },
];

const MessageScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages);

  // Video call states
  const [videoCall, setVideoCall] = useState(false);

  // Audio call states
  const [audioCall, setAudioCall] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callMessage, setCallMessage] = useState("");

  // Agora engine reference
  const agoraEngineRef = useRef(null);
  const eventHandlerRef = useRef(null);

  // Agora connection config
  const appId = "24a84a4da7cf4f8ba761099a03c0ee13";
  const token =
    "007eJxTYIiTrn3rFXgmpfBT5qRzFtbtloulpjwsvzgnRU3xXTOzWb8Cg5FJooVJoklKonlymkmaRVKiuZmhgaVlooFxskFqqqGx+unf6Q2BjAxqa9NZGBkgEMRnZyhJLS4xNDJmYAAAkJAfxg==";
  const channelName = "test123";

  const connectionData = {
    appId: appId,
    channel: channelName,
    token: token,
  };

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  const setupVoiceSDKEngine = async () => {
    try {
      if (Platform.OS === "android") {
        await getPermission();
      }

      const agoraEngine = createAgoraRtcEngine();
      agoraEngineRef.current = agoraEngine;

      agoraEngine.initialize({
        appId: appId,
      });

      agoraEngine.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication
      );
      agoraEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
      agoraEngine.enableAudio();

      setupEventHandler();

      setCallMessage("Engine initialized successfully");
    } catch (e) {
      console.error("Setup failed:", e);
      setCallMessage(`Engine setup failed: ${e.message}`);
    }
  };

  const setupEventHandler = () => {
    eventHandlerRef.current = {
      onJoinChannelSuccess: (connection, elapsed) => {
        setCallMessage(`Joined channel: ${connection.channelId}`);
        setIsJoined(true);
        setLoading(false);
      },
      onUserJoined: (connection, uid) => {
        setCallMessage(`Remote user ${uid} joined`);
        setRemoteUid(uid);
      },
      onUserOffline: (connection, uid) => {
        setCallMessage(`Remote user ${uid} left`);
        setRemoteUid(0);
      },
      onConnectionLost: (connection) => {
        setCallMessage("Connection lost");
        setIsJoined(false);
        setRemoteUid(0);
      },
      onError: (err, msg) => {
        setCallMessage(`Error: ${msg} (${err})`);
        setLoading(false);
      },
    };

    agoraEngineRef.current?.registerEventHandler(eventHandlerRef.current);
  };

  // Join audio channel
  const joinChannel = async () => {
    setLoading(true);

    try {
      await setupVoiceSDKEngine();

      await agoraEngineRef.current?.joinChannel(token, channelName, 0, {
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishMicrophoneTrack: true,
        autoSubscribeAudio: true,
      });
    } catch (e) {
      console.error("Join failed:", e);
      setCallMessage(`Join failed: ${e.message}`);
      setLoading(false);
    }
  };

  // Leave audio channel
  const leaveChannel = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      setIsJoined(false);
      setRemoteUid(0);
      setCallMessage("Left channel");
      setAudioCall(false);

      // Clean up the Agora engine
      if (agoraEngineRef.current) {
        agoraEngineRef.current.unregisterEventHandler(eventHandlerRef.current);
        agoraEngineRef.current.release();
        agoraEngineRef.current = null;
      }
    } catch (e) {
      console.error("Leave failed:", e);
      setCallMessage(`Leave failed: ${e.message}`);
    }
  };

  // Toggle microphone mute
  const toggleMute = async () => {
    try {
      await agoraEngineRef.current?.muteLocalAudioStream(!isMuted);
      setIsMuted(!isMuted);
      setCallMessage(isMuted ? "Microphone on" : "Microphone muted");
    } catch (e) {
      console.error("Mute toggle failed:", e);
    }
  };

  // Start video call
  const startVideoCall = () => {
    if (token) {
      setVideoCall(true);
    } else {
      alert("Token not ready yet");
    }
  };

  // Start audio call
  const startAudioCall = () => {
    setAudioCall(true);
    joinChannel();
  };

  // Get the first letter of the username for avatar
  const getFirstLetter = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "A";
  };

  // Send chat message
  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  // Render chat message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "me" ? styles.myMessageText : null,
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          item.sender === "me" ? styles.myMessageTime : null,
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  // If video call is active, render the Agora UI Kit
  if (videoCall) {
    return (
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    );
  }

  // If audio call is active, render the audio call interface
  if (audioCall) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <Text style={styles.title}>Voice Call with {user.name}</Text>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>
              {isJoined ? "Leaving call..." : "Joining call..."}
            </Text>
          </View>
        )}

        <View style={styles.callContainer}>
          <View style={styles.callHeader}>
            <Text style={styles.channelNameText}>{channelName}</Text>
            <Text style={styles.callStatusText}>
              {remoteUid ? "Connected" : "Waiting for others..."}
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            {/* Your avatar */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getFirstLetter("You")}</Text>
              </View>
              <Text style={styles.avatarLabel}>You</Text>
            </View>

            {/* Remote user avatar (if connected) */}
            {remoteUid > 0 && (
              <View style={styles.avatarWrapper}>
                <View style={[styles.avatar, styles.remoteAvatar]}>
                  <Text style={styles.avatarText}>
                    {getFirstLetter(user.name)}
                  </Text>
                </View>
                <Text style={styles.avatarLabel}>{user.name}</Text>
              </View>
            )}
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.messageText}>{callMessage}</Text>
            <Text style={styles.callDurationText}>
              {remoteUid ? "In call" : "Waiting for connection..."}
            </Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.mutedButton]}
              onPress={toggleMute}
            >
              <Text style={styles.controlButtonText}>
                {isMuted ? "Unmute" : "Mute"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.leaveButton]}
              onPress={leaveChannel}
            >
              <Text style={styles.controlButtonText}>End Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Otherwise render the chat interface
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={startVideoCall}>
            <Icon name="videocam" size={22} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={startAudioCall}>
            <Icon name="call" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        inverted={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="add-circle-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            {message.trim().length > 0 ? (
              <Icon name="send" size={24} color="#007AFF" />
            ) : (
              <Icon name="mic" size={24} color="#007AFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  status: {
    fontSize: 14,
    color: "#4CD964",
  },
  headerRight: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  messageTime: {
    fontSize: 12,
    color: "#8E8E93",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  myMessageTime: {
    color: "rgba(255,255,255,0.7)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 120,
    marginHorizontal: 8,
  },
  sendButton: {
    padding: 8,
  },
  // Audio call styles
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 100,
  },
  loadingText: {
    marginTop: 10,
    color: "#007AFF",
    fontWeight: "500",
  },
  callContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  callHeader: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 10,
  },
  channelNameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  callStatusText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  avatarWrapper: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
  },
  avatarLabel: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  remoteAvatar: {
    backgroundColor: "#FF9500",
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  callDurationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 5,
  },
  messageText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  controlButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mutedButton: {
    backgroundColor: "#FF3B30",
  },
  leaveButton: {
    backgroundColor: "#FF9500",
  },
  controlButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MessageScreen;
