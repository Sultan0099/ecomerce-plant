import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';

import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign"

import { Block, Text, Button } from "../components/common"
import { theme } from '../constants';
import { register } from '../redux/actions/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RegisterScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({});
    const handleSubmit = async () => {

        const errors = {}
        if (values.firstName === "") {
            errors.firstName = "field is mandatory"
        } else if (/\s/.test(values.firstName)) {
            errors.firstName = "Remove Spaces"
        }
        if (values.lastName === "") {
            errors.lastName = "field is mandatory"
        } else if (/\s/.test(values.lastName)) {
            errors.lastName = "Remove Spaces"
        }

        if (values.email === "") {
            errors.email = "email is mandatory"
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
            errors.email = "wrong email format"
        }

        if (values.password === "") {
            errors.password = "password is mandatory"
        }
        if (values.confirmPassword === "") {
            errors.confirmPassword = "field is mandatory"
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "password does not match"
        }


        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            const res = await dispatch(register(values));
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
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Login")}>
                    <Text color={theme.colors.white}> Already have Account?</Text>
                </TouchableOpacity>
            </Block >

            <Text color={theme.colors.white} style={styles.name} > Greener. </Text>

            <View style={styles.form}>
                <Text header color={theme.colors.white} style={{ marginBottom: 2 }}> Register with email/password </Text>
                <Block flex={false} row style={{ justifyContent: 'space-between' }}>
                    <View style={[styles.inputGroup, { width: "49%" }]}>
                        <Text bold color={theme.colors.white} body> First Name </Text>
                        <TextInput
                            style={[styles.input, { borderColor: errors.firstName ? "red" : "black" }]}
                            autoCapitalize="none"
                            autoCompleteType="name"
                            placeholder="First tName"
                            onChangeText={(value) => setValues({ ...values, firstName: value.trim() })}
                            value={values.firstName}
                        />
                        {errors.firstName && <Text color={"red"} header >{errors.firstName} </Text>}
                    </View>
                    <View style={[styles.inputGroup, { width: "49%" }]}>
                        <Text bold color={theme.colors.white} body> Last Name </Text>
                        <TextInput
                            style={[styles.input, { borderColor: errors.lastName ? "red" : "black" }]}
                            autoCapitalize="none"
                            autoCompleteType="name"
                            placeholder="Last Name"
                            onChangeText={(value) => setValues({ ...values, lastName: value.trim() })}
                            value={values.lastName}
                        />
                        {errors.lastName && <Text color={"red"} header >{errors.lastName} </Text>}

                    </View>
                </Block>
                <View style={styles.inputGroup}>
                    <Text bold color={theme.colors.white} body> Email </Text>
                    <TextInput
                        style={[styles.input, { borderColor: errors.email ? "red" : "black" }]}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Enter Your Email"
                        onChangeText={(value) => setValues({ ...values, email: value.trim() })}
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
                        onChangeText={(value) => setValues({ ...values, password: value.trim() })}
                        value={values.password}
                    />
                    {errors.password && <Text color={"red"} header >{errors.password} </Text>}

                </View>
                <View style={styles.inputGroup}>
                    <Text bold color={theme.colors.white} body> Confirm Password </Text>
                    <TextInput
                        style={[styles.input, { borderColor: errors.confirmPassword ? "red" : "black" }]}
                        autoCapitalize="none"
                        autoCompleteType="password"
                        placeholder="Re-Enter your Password"
                        secureTextEntry
                        onChangeText={(value) => setValues({ ...values, confirmPassword: value.trim() })}
                        value={values.confirmPassword}
                    />
                    {errors.confirmPassword && <Text color={"red"} header >{errors.confirmPassword} </Text>}

                </View>
                <Button color={theme.colors.secondary} onPress={handleSubmit}>
                    <Text center color={theme.colors.white} bold title>CREATE ACCOUNT</Text>
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
        backgroundColor: theme.colors.dark,
    },
    form: {
        width: "80%",
        marginTop: "10%",
    },
    inputGroup: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 20

    },
})

export default RegisterScreen
