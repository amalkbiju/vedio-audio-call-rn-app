import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const dummyUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/27.jpg",
    lastMessage: "Hey, are we still meeting today?",
    time: "10:45 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Mike Anderson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "I just sent you the files",
    time: "9:30 AM",
    unread: 0,
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Thanks for your help yesterday!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    name: "David Chen",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    lastMessage: "Let me know when youre free to talk",
    time: "Yesterday",
    unread: 3,
  },
  {
    id: "5",
    name: "Jennifer Lopez",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    lastMessage: "See you at the conference!",
    time: "Monday",
    unread: 0,
  },
  {
    id: "6",
    name: "Robert Smith",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    lastMessage: "The presentation looks great!",
    time: "Sunday",
    unread: 0,
  },
];

const ChatListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("MessageScreen", { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.nameTimeRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageUnreadRow}>
          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="create-outline" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
        <Text style={styles.searchPlaceholder}>Search</Text>
      </View>

      <FlatList
        data={dummyUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: "#8E8E93",
    fontSize: 16,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  messageUnreadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  time: {
    fontSize: 14,
    color: "#8E8E93",
  },
  message: {
    fontSize: 16,
    color: "#8E8E93",
    flex: 1,
    paddingRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#007AFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChatListScreen;
