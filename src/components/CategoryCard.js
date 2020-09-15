import React from "react";

import { Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Badge, Text } from "./common";

import { theme } from "../constants";

const { width } = Dimensions.get("screen");


const CategoryCard = (props) => {
    const { img, name, count } = props;
    return (

        <TouchableOpacity activeOpacity={0.25} onPress={() => props.navigation.navigate('Products', { category: name.toLowerCase() })}>
            <Card center middle shadow style={styles.category}>
                <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41,216,143,0.20)"
                >
                    <Image source={img} />
                </Badge>
                <Text medium height={20}>
                    {name}
                </Text>
            </Card>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    category: {
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
    },

})

export default CategoryCard; 