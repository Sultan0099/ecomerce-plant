import React, { useState } from 'react'
import { StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from "react-native-vector-icons/AntDesign"

import { Block, Text } from '../components/common';
import ProductCard from '../components/ProductCard';
import { theme } from '../constants';
import { searchProduct } from '../redux/actions/products';


const SearchScreen = (props) => {
    const { navigation } = props;

    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const handleSearch = async () => {
        setLoading(true)
        if (searchQuery === "") {
            setLoading(false);
            setProducts([])
            return
        }

        const searchRes = await searchProduct(searchQuery);
        console.log(searchRes)

        if (searchRes.err) { return }
        setSearchQuery("");
        setProducts(searchRes.res.data.products);
        setLoading(false)
    }
    const _renderCard = ({ item }) => {
        return (
            <ProductCard
                productId={item._id}
                name={item.name}
                price={item.price}
                imgUrl={item.productPic[0].path}
                description={item.description}
                {...props}
            />
        )
    }
    return (
        <Block color={theme.colors.white}>
            <Block flex={false} row color={theme.colors.white} space="between" style={styles.header}>
                <Block center middle flex={false} color={theme.colors.white} style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrowleft" size={30} color={theme.colors.gray} />
                    </TouchableOpacity>
                </Block>
                <Block middle flex={false} color={theme.colors.white} style={styles.headerMiddle}>
                    <Block flex={false} row color={theme.colors.gray2} style={styles.search} >
                        <Icon name="search1" size={16} color={theme.colors.gray} style={{ marginRight: 3 }} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search"
                            autoCapitalize="none"
                            onChangeText={(value) => setSearchQuery(value)}
                            value={searchQuery}
                        />
                    </Block>
                </Block>
                <Block center middle flex={false} color={theme.colors.white} style={styles.headerLeft}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Text secondary header >
                            Search
                        </Text>
                    </TouchableOpacity>
                </Block>
            </Block>
            { loading ? <ActivityIndicator size="large" color={theme.colors.secondary} />
                : <Block center style={{ marginTop: 10 }}>
                    <FlatList
                        style={{ width: "100%" }}
                        data={products}
                        renderItem={_renderCard}
                        keyExtractor={item => item._id}
                        numColumns={2}
                    />
                </Block>}
        </Block>
    )
}


const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 60
    },
    headerLeft: {
        width: "20%",
    },
    headerMiddle: {
        width: "60%",
        paddingHorizontal: 5
    },
    search: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 5,
        height: 40,
        overflow: "hidden",
    },
    textInput: {
        width: "100%"
    }
})

SearchScreen.navigationOptions = ({ navigation }) => {
    return {
        headerShown: false
    }
}

export default SearchScreen
