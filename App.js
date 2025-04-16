import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Navigator from "./src/navigators";
import * as Font from "expo-font";
import { CustomeFonts } from "./src/constants";

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const appStart = async () => {
    await Font.loadAsync(CustomeFonts);
    setIsAppReady(true);
  };
  useEffect(() => {
    appStart();
  }, []);
  return isAppReady ? <Navigator /> : null;
};

export default App;
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Button,
//   Platform,
//   PermissionsAndroid,
// } from "react-native";
// import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";

// const VideoCallScreen = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const peerConnection = useRef(null);

//   useEffect(() => {
//     // Initialize peer connection
//     peerConnection.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     // Handle remote stream (modern approach)
//     peerConnection.current.ontrack = (event) => {
//       if (event.streams && event.streams[0]) {
//         setRemoteStream(event.streams[0]);
//       }
//     };

//     return () => {
//       if (peerConnection.current) {
//         peerConnection.current.close();
//       }
//     };
//   }, []);

//   const startCall = async () => {
//     try {
//       // Request permissions
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ]);

//         if (
//           granted[PermissionsAndroid.PERMISSIONS.CAMERA] !==
//             PermissionsAndroid.RESULTS.GRANTED ||
//           granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] !==
//             PermissionsAndroid.RESULTS.GRANTED
//         ) {
//           console.log("Permissions not granted");
//           return;
//         }
//       }

//       // Get local stream
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: { facingMode: "user" },
//       });

//       setLocalStream(stream);

//       // Add tracks to peer connection (modern approach)
//       stream.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, stream);
//       });

//       // Create offer
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);

//       // Here you would typically send the offer to the other peer via a signaling server
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//       setLocalStream(null);
//     }
//     if (remoteStream) {
//       setRemoteStream(null);
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = new RTCPeerConnection({
//         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {remoteStream && (
//         <RTCView
//           streamURL={remoteStream.toURL()}
//           style={styles.remoteVideo}
//           objectFit="cover"
//         />
//       )}
//       {localStream && (
//         <RTCView
//           streamURL={localStream.toURL()}
//           style={styles.localVideo}
//           objectFit="cover"
//         />
//       )}
//       <View style={styles.buttons}>
//         <Button title="Start Call" onPress={startCall} />
//         <Button title="End Call" onPress={endCall} />
//       </View>
//     </View>
//   );
// };

// // ... (keep the same styles as before)

// export default VideoCallScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   remoteVideo: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//   },
//   localVideo: {
//     width: 100,
//     height: 150,
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     borderRadius: 10,
//   },
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 20,
//   },
// });
