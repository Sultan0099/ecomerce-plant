import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'

import Icon from "react-native-vector-icons/AntDesign"

import { Block, Text, Button } from "./common";
import { theme } from '../constants';

const CartCard = (props) => {
    const { navigation } = props;
    const [check, setCheck] = useState(false)

    const {
        productId,
        name,
        image,
        price,
        quantity,
        category,
        increaseQuantity,
        decreaseQuantity,
        handleShowPrice,
    } = props;



    const toggleCheckBox = (productId) => {
        handleShowPrice(productId)
        setCheck(!check)

    }

    return (
        <Block flex={false} row style={styles.card}>
            <Block flex={false} center middle style={styles.cardAction} >
                <Button
                    style={[styles.checkbox, { backgroundColor: check ? theme.colors.secondary : theme.colors.white, }]}
                    onPress={() => toggleCheckBox(productId)}>
                    {check && <Icon name="check" size={16} color={theme.colors.white} style={{ width: "100%", height: "100%" }} />}
                </Button>
            </Block>
            <Block flex={false} center middle style={styles.cardMedia}>
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                        uri: image
                    }}
                />
            </Block>
            <Block flex={false} style={styles.cardContent}>
                <Block flex={false} style={styles.cardContentTop}>
                    <Text h2  >{name}</Text>
                    <Text caption gray2 bold> {category} </Text>
                </Block>
                <Block flex={false} row space="between" style={styles.cardContentBottom}>
                    <Text h1 bold primary> ${price} </Text>
                    <Block flex={false} row center style={styles.cardContentAction}>
                        <TouchableOpacity style={{ padding: 3 }}
                            onPress={() => increaseQuantity(productId)}>
                            <Icon name="plus" size={20} />
                        </TouchableOpacity>
                        <Block
                            flex={false}
                            center
                            middle
                            style={styles.textInput}
                        >
                            <Text> {quantity} </Text>
                        </Block>
                        <TouchableOpacity style={{ padding: 3 }}
                            onPress={() => decreaseQuantity(productId)}>
                            <Icon name="minus" size={20} />
                        </TouchableOpacity>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}



const styles = StyleSheet.create({


    card: {
        height: 110,
        backgroundColor: theme.colors.white,
        marginTop: 5
    },
    cardAction: {
        width: "10%",
        height: "100%",
    },
    checkbox: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        borderColor: theme.colors.gray,
        borderWidth: 1,

        padding: 5
    },
    cardMedia: {
        width: "30%",
        height: "100%",
    },
    cardContent: {
        width: "60%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: "100%",
    },
    cardContentTop: {

        height: "50%",
    },
    cardContentBottom: {

        height: "50%",
        alignItems: "flex-end",
        paddingVertical: 5
    },
    cardContentAction: {
        marginRight: 10,
        height: "100%",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        height: 30,
        width: 40,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingVertical: 0

    }

})

export default CartCard
