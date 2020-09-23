import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

import { Text } from "./common";

const Input = (props) => {
    const { label, error, errorMsg, value, handleChange,
        keyboardType, propertyName, placeholder,
        multiline = false } = props;
    return (
        <View style={styles.inputGroup}>
            <Text bold color="black" body> {label} </Text>
            <TextInput
                style={[styles.input, { borderColor: error ? "red" : "black" }]}
                autoCapitalize="none"
                keyboardType={keyboardType}
                placeholder={placeholder}
                onChangeText={(value) => handleChange(value, propertyName)}
                value={value}
                multiline={multiline}
            />
            {error && <Text color={"red"} header >{errorMsg} </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 20

    },
})

export default Input
