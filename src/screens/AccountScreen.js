import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import { Button, Text } from "../components/common"
import { theme } from '../constants';


const AccountScreen = (props) => {

    const user = useSelector(state => state.auth.user);

    if (user) {
        return (
            <View style={styles.buttonContainer}>
                <Text center >
                    {user.firstName + " " + user.lastName}
                </Text>
                <Button style={styles.button} onPress={() => props.navigation.navigate("Auth")}>
                    <Text center color={theme.colors.white}>
                        Login with Another Account
                    </Text>
                </Button>
            </View>
        )
    }

    return (
        <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={() => props.navigation.navigate("Auth")}>
                <Text center color={theme.colors.white}>
                    LOGIN / REGISTER
               </Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        height: "50%",
        backgroundColor: 'rgba(0,0,0,0.05)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: "80%",
        display: "flex",
        justifyContent: 'center',
        backgroundColor: theme.colors.dark,
        color: theme.colors.white
    }
})

export default AccountScreen
