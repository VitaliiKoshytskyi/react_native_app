import { Pressable, Text, StyleSheet } from "react-native";

export default function Button  ({ text, onPress}) {
    return (
            <Pressable>
                <Text style={styles.btn}  onPress={onPress}>
                    {text}
                </Text>
            </Pressable>
    );
};


const styles = StyleSheet.create({
    btn: {
        width: 343,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 16,
        color: "#FFFFFF",
        marginBottom: 16,
    },
});