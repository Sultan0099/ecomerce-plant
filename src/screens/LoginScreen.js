import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';

import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign"

import { Block, Text, Button } from "../components/common"
import { theme } from '../constants';
import { login } from '../redux/actions/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        email: null,
        password: null
    });
    const handleSubmit = async () => {
        console.log("email", values.email)
        console.log("password", values.password)

        const errors = {}

        if (values.password === "") {

            errors.password = "password is mandatory"

        }

        if (values.email === "") {
            errors.email = "email is mandatory"
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
            errors.email = "wrong email format"
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            const res = await dispatch(login({ email: values.email, password: values.password }));
            if (res.err) {
                console.log(err);
            } else {
                navigation.navigate("Main")
            }
            setErrors({})
        }


    }

    return (
        <Block center middle style={styles.container}>
            <Block flex={false} row style={styles.header}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Main")}>
                    <Icon name="close" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Register")}>
                    <Text color={theme.colors.white}> Create New Account?</Text>
                </TouchableOpacity>
            </Block >

            <Text color={theme.colors.white} style={styles.name} > Greener. </Text>
            <View style={styles.tagLineWrapper}>
                <Text color={theme.colors.white} title center >
                    {"best market place to buy products related to gardening.".toUpperCase()}
                </Text>
            </View>
            <View style={styles.form}>
                <Text header color={theme.colors.white} style={{ marginBottom: 2 }}> Login with email/password </Text>
                <View style={styles.inputGroup}>
                    <Text bold color={theme.colors.white} body> Email </Text>
                    <TextInput
                        style={[styles.input, { borderColor: errors.email ? "red" : "black" }]}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Enter Your Email"
                        onChangeText={(value) => setValues({ ...values, email: value })}
                        value={values.email}
                    />
                    {errors.email && <Text color={"red"} header >{errors.email} </Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text bold color={theme.colors.white} body> Password </Text>
                    <TextInput
                        style={[styles.input, { borderColor: errors.password ? "red" : "black" }]}
                        autoCapitalize="none"
                        autoCompleteType="password"
                        placeholder="Enter Your Password"
                        secureTextEntry
                        onChangeText={(value) => setValues({ ...values, password: value })}
                        value={values.password}
                    />
                    {errors.password && <Text color={"red"} header >{errors.password} </Text>}

                </View>

                <Button color={theme.colors.secondary} onPress={handleSubmit}>
                    <Text center color={theme.colors.white} bold title>LOGIN</Text>
                </Button>
            </View>

        </Block>
    )
}

const styles = StyleSheet.create({
    header: { height: 40, position: "absolute", top: 0, width: "100%", zIndex: 3, justifyContent: 'space-between', backgroundColor: theme.colors.dark },
    name: {
        fontSize: 40,
        fontWeight: "700"
    },
    tagLineWrapper: {
        marginTop: 40,
        width: "60%",
    },
    tagLine: {
        fontSize: 18,
    },
    container: {
        backgroundColor: theme.colors.dark
    },
    form: {
        width: "80%",
        marginTop: "20%",
    },
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

export default LoginScreen
