import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input (props) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <TextInput
            {...props}
                style={[styles.input, isFocused && styles.inputFocused]}
                
                placeholderTextColor="#BDBDBD"
                
                onFocus={handleFocus}
                onBlur={handleBlur}
            
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight:90,
        marginBottom: 16,
    },
    inputFocused: {
        borderColor: "#FF6C00",
        borderWidth: 1,
    },
});
