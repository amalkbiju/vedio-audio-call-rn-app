// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// const dummyMessages = [
//   {
//     id: "1",
//     text: "Hey there! How are you doing today?",
//     time: "10:30 AM",
//     sender: "them",
//   },
//   {
//     id: "2",
//     text: "I'm doing great! Just finished that project we talked about.",
//     time: "10:32 AM",
//     sender: "me",
//   },
//   {
//     id: "3",
//     text: "That's fantastic! Could you send me the files when you have a moment?",
//     time: "10:33 AM",
//     sender: "them",
//   },
//   {
//     id: "4",
//     text: "Of course! I'll email them to you right away.",
//     time: "10:35 AM",
//     sender: "me",
//   },
//   {
//     id: "5",
//     text: "Also, are we still meeting for coffee tomorrow?",
//     time: "10:36 AM",
//     sender: "them",
//   },
//   {
//     id: "6",
//     text: "Yes, absolutely! 2pm at the usual place?",
//     time: "10:38 AM",
//     sender: "me",
//   },
//   {
//     id: "7",
//     text: "Perfect! Looking forward to it.",
//     time: "10:39 AM",
//     sender: "them",
//   },
//   {
//     id: "8",
//     text: "Me too! See you then.",
//     time: "10:40 AM",
//     sender: "me",
//   },
// ];

// const MessageScreen = ({ navigation, route }) => {
//   const { user } = route.params;
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState(dummyMessages);

//   // Get the first letter of the username for avatar
//   const getFirstLetter = (name) => {
//     return name && name.length > 0 ? name.charAt(0).toUpperCase() : "A";
//   };

//   // Send chat message
//   const sendMessage = () => {
//     if (message.trim().length > 0) {
//       const newMessage = {
//         id: Date.now().toString(),
//         text: message,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         sender: "me",
//       };
//       setMessages([...messages, newMessage]);
//       setMessage("");
//     }
//   };

//   // Render chat message
//   const renderMessage = ({ item }) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.sender === "me" ? styles.myMessage : styles.theirMessage,
//       ]}
//     >
//       <Text
//         style={[
//           styles.messageText,
//           item.sender === "me" ? styles.myMessageText : null,
//         ]}
//       >
//         {item.text}
//       </Text>
//       <Text
//         style={[
//           styles.messageTime,
//           item.sender === "me" ? styles.myMessageTime : null,
//         ]}
//       >
//         {item.time}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backButton}
//           >
//             <Icon name="chevron-back" size={24} color="#007AFF" />
//           </TouchableOpacity>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{getFirstLetter(user.name)}</Text>
//           </View>
//           <View>
//             <Text style={styles.name}>{user.name}</Text>
//             <Text style={styles.status}>Online</Text>
//           </View>
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Icon name="videocam" size={22} color="#007AFF" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <Icon name="call" size={22} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.messagesList}
//         showsVerticalScrollIndicator={false}
//         inverted={false}
//       />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : null}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
//       >
//         <View style={styles.inputContainer}>
//           <TouchableOpacity style={styles.attachButton}>
//             <Icon name="add-circle-outline" size={24} color="#007AFF" />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.input}
//             placeholder="Message"
//             value={message}
//             onChangeText={setMessage}
//             multiline
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//             {message.trim().length > 0 ? (
//               <Icon name="send" size={24} color="#007AFF" />
//             ) : (
//               <Icon name="mic" size={24} color="#007AFF" />
//             )}
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F2F2F7",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#F2F2F2",
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   backButton: {
//     marginRight: 12,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//     backgroundColor: "#007AFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatarText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   status: {
//     fontSize: 14,
//     color: "#4CD964",
//   },
//   headerRight: {
//     flexDirection: "row",
//   },
//   iconButton: {
//     padding: 8,
//     marginLeft: 8,
//   },
//   messagesList: {
//     padding: 16,
//   },
//   messageBubble: {
//     maxWidth: "80%",
//     padding: 12,
//     borderRadius: 18,
//     marginBottom: 10,
//   },
//   myMessage: {
//     alignSelf: "flex-end",
//     backgroundColor: "#007AFF",
//     borderBottomRightRadius: 4,
//   },
//   theirMessage: {
//     alignSelf: "flex-start",
//     backgroundColor: "#E5E5EA",
//     borderBottomLeftRadius: 4,
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#000000",
//   },
//   myMessageText: {
//     color: "#FFFFFF",
//   },
//   messageTime: {
//     fontSize: 12,
//     color: "#8E8E93",
//     alignSelf: "flex-end",
//     marginTop: 4,
//   },
//   myMessageTime: {
//     color: "rgba(255,255,255,0.7)",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     backgroundColor: "#FFFFFF",
//     borderTopWidth: 1,
//     borderTopColor: "#F2F2F2",
//   },
//   attachButton: {
//     padding: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F2F2F7",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     maxHeight: 120,
//     marginHorizontal: 8,
//   },
//   sendButton: {
//     padding: 8,
//   },
// });

// export default MessageScreen;
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";

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
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);

  // Audio call states
  const [showAudioCall, setShowAudioCall] = useState(false);
  const [audioLocalStream, setAudioLocalStream] = useState(null);
  const [audioRemoteStream, setAudioRemoteStream] = useState(null);
  const audioPeerConnection = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const timerRef = useRef(null);

  // Initialize WebRTC when component mounts
  useEffect(() => {
    // Initialize peer connection on component mount
    initializePeerConnection();
    initializeAudioPeerConnection();

    return () => {
      // Clean up on unmount
      cleanupVideoCall();
      cleanupAudioCall();
    };
  }, []);

  // Initialize video peer connection
  const initializePeerConnection = () => {
    console.log("Initializing peer connection");
    try {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        console.log("Remote track received");
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      // Log connection state changes
      peerConnection.current.oniceconnectionstatechange = () => {
        console.log(
          "ICE connection state:",
          peerConnection.current.iceConnectionState
        );
      };

      // Log ICE candidate events
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("ICE candidate:", event.candidate);
          // Here you would send this candidate to the other peer via signaling server
        }
      };
    } catch (error) {
      console.error("Error initializing peer connection:", error);
    }
  };

  // Initialize audio peer connection
  const initializeAudioPeerConnection = () => {
    console.log("Initializing audio peer connection");
    try {
      audioPeerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // Handle remote stream
      audioPeerConnection.current.ontrack = (event) => {
        console.log("Audio remote track received");
        if (event.streams && event.streams[0]) {
          setAudioRemoteStream(event.streams[0]);
        }
      };

      // Log connection state changes
      audioPeerConnection.current.oniceconnectionstatechange = () => {
        console.log(
          "Audio ICE connection state:",
          audioPeerConnection.current.iceConnectionState
        );
      };

      // Log ICE candidate events
      audioPeerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Audio ICE candidate:", event.candidate);
          // Here you would send this candidate to the other peer via signaling server
        }
      };
    } catch (error) {
      console.error("Error initializing audio peer connection:", error);
    }
  };

  // Start video call
  const startVideoCall = async () => {
    try {
      // Make sure peer connection is initialized
      if (!peerConnection.current) {
        console.log("Peer connection not initialized, creating it now");
        initializePeerConnection();
      }

      // Request permissions
      if (Platform.OS === "android") {
        console.log("Requesting Android permissions");
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] !==
            PermissionsAndroid.RESULTS.GRANTED ||
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] !==
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Permissions not granted");
          return;
        }
      }

      console.log("Getting user media");
      // Get local stream
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "user" },
      });

      console.log("Local stream obtained");
      setLocalStream(stream);

      // Double check peer connection exists before adding tracks
      if (!peerConnection.current) {
        console.log(
          "Peer connection still null after initialization, recreating"
        );
        initializePeerConnection();

        if (!peerConnection.current) {
          console.error("Failed to create peer connection");
          return;
        }
      }

      // Add tracks to peer connection
      console.log("Adding tracks to peer connection");
      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      // Create offer
      console.log("Creating offer");
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      console.log("Offer created:", offer);
      // Here you would typically send the offer to the other peer via a signaling server

      // For demo purposes, we'll just show the video modal
      setShowVideoCall(true);
    } catch (error) {
      console.error("Error starting video call:", error);
      alert(`Error starting video call: ${error.message}`);
    }
  };

  // Start audio call
  const startAudioCall = async () => {
    try {
      // Make sure peer connection is initialized
      if (!audioPeerConnection.current) {
        console.log("Audio peer connection not initialized, creating it now");
        initializeAudioPeerConnection();
      }

      // Request permissions
      if (Platform.OS === "android") {
        console.log("Requesting Android permissions for audio");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Audio permission not granted");
          return;
        }
      }

      console.log("Getting audio stream");
      // Get local audio stream
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      console.log("Audio stream obtained");
      setAudioLocalStream(stream);
      setIsCalling(true);

      // Add tracks to peer connection
      console.log("Adding audio tracks to peer connection");
      stream.getTracks().forEach((track) => {
        audioPeerConnection.current.addTrack(track, stream);
      });

      // Create offer
      console.log("Creating audio offer");
      const offer = await audioPeerConnection.current.createOffer();
      await audioPeerConnection.current.setLocalDescription(offer);

      console.log("Audio offer created:", offer);

      // Start call timer
      timerRef.current = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);

      // Here you would typically send the offer to the other peer via a signaling server

      // For demo purposes, we'll just show the audio call modal
      setShowAudioCall(true);
    } catch (error) {
      console.error("Error starting audio call:", error);
      alert(`Error starting audio call: ${error.message}`);
    }
  };

  // Cleanup video call
  const cleanupVideoCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
  };

  // Cleanup audio call
  const cleanupAudioCall = () => {
    if (audioLocalStream) {
      audioLocalStream.getTracks().forEach((track) => track.stop());
    }
    if (audioPeerConnection.current) {
      audioPeerConnection.current.close();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // End video call
  const endVideoCall = () => {
    console.log("Ending video call");

    cleanupVideoCall();
    setLocalStream(null);
    setRemoteStream(null);

    // Reinitialize for next call
    initializePeerConnection();

    setShowVideoCall(false);
  };

  // End audio call
  const endAudioCall = () => {
    console.log("Ending audio call");

    cleanupAudioCall();
    setAudioLocalStream(null);
    setAudioRemoteStream(null);
    setIsCalling(false);
    setCallTimer(0);

    // Reinitialize for next call
    initializeAudioPeerConnection();

    setShowAudioCall(false);
  };

  // Format time for audio call
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getFirstLetter(user.name)}</Text>
          </View>
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

      {/* Video Call Modal */}
      <Modal
        visible={showVideoCall}
        animationType="slide"
        onRequestClose={endVideoCall}
      >
        <SafeAreaView style={styles.videoContainer}>
          {remoteStream ? (
            <RTCView
              streamURL={remoteStream.toURL()}
              style={styles.remoteVideo}
              objectFit="cover"
            />
          ) : (
            <View style={styles.remoteVideoPlaceholder}>
              <View style={styles.largeAvatar}>
                <Text style={styles.largeAvatarText}>
                  {getFirstLetter(user.name)}
                </Text>
              </View>
              <Text style={styles.connectingText}>Connecting...</Text>
            </View>
          )}

          {localStream && (
            <RTCView
              streamURL={localStream.toURL()}
              style={styles.localVideo}
              objectFit="cover"
            />
          )}

          <View style={styles.callControls}>
            <TouchableOpacity
              style={styles.endCallButton}
              onPress={endVideoCall}
            >
              <Icon name="call" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Audio Call Modal */}
      <Modal
        visible={showAudioCall}
        animationType="slide"
        onRequestClose={endAudioCall}
      >
        <SafeAreaView style={styles.audioContainer}>
          <View style={styles.audioStatusContainer}>
            <Text style={styles.audioCallerName}>{user.name}</Text>
            {isCalling ? (
              <Text style={styles.audioStatusText}>
                {formatTime(callTimer)}
              </Text>
            ) : (
              <Text style={styles.audioStatusText}>Connecting...</Text>
            )}
          </View>

          <View style={styles.audioAvatarContainer}>
            <View style={styles.audioAvatar}>
              <Text style={styles.audioAvatarText}>
                {getFirstLetter(user.name)}
              </Text>
            </View>
          </View>

          <View style={styles.audioControlsContainer}>
            <TouchableOpacity
              style={styles.endAudioCallButton}
              onPress={endAudioCall}
            >
              <Icon name="call" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
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

  // Video call styles
  videoContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  remoteVideoPlaceholder: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
  },
  largeAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  largeAvatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 48,
  },
  connectingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  localVideo: {
    width: 100,
    height: 150,
    position: "absolute",
    top: 50,
    right: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  callControls: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "135deg" }],
  },

  // Audio call styles
  audioContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
    padding: 20,
  },
  audioStatusContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  audioCallerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  audioStatusText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  audioAvatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  audioAvatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  audioControlsContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  endAudioCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "135deg" }],
  },
});

export default MessageScreen;
