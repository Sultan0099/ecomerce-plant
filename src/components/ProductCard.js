import React from 'react'

import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../constants';
import { Block, Text } from "./common";

const ProductCard = (props) => {

    const { imgUrl, name, price, description, productId, navigation } = props;
    return (

        <Block flex={false} style={styles.card} >
            <TouchableOpacity activeOpacity={0.25} onPress={() => navigation.push("Product", { productId, productName: name })}>
                <Block flex={false} style={styles.cardMedia}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{
                            uri: imgUrl
                        }}
                    />
                </Block>
                <Block flex={false} style={styles.cardContent}>
                    <Text bold title >{name.toUpperCase()}</Text>
                    <Text color={theme.colors.gray}>{description}</Text>
                    <Text bold h2 color={theme.colors.secondary} >${price}</Text>
                </Block>
            </TouchableOpacity>
        </Block>

    )
}

const styles = StyleSheet.create({
    card: {

        width: "45%",
        backgroundColor: theme.colors.white,
        marginHorizontal: 10,
        borderRadius: 5,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 5
    },

    cardMedia: {
        width: "100%",
        height: 180,
    },

    cardContent: {
        padding: 5
    }

})

export default ProductCard
