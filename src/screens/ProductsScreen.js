import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native'

import { useDispatch, useSelector } from 'react-redux';

import Icon from "react-native-vector-icons/AntDesign"

import { Button, Text, Block } from "../components/common";
import ProductCard from "../components/ProductCard";
import { theme } from '../constants';

import { getProducts } from '../redux/actions/products'
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProductsScreen = (props) => {

    const dispatch = useDispatch();
    const { navigation } = props;

    const category = navigation.getParam('category');
    const products = useSelector(state => state.products.products)
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        await dispatch(getProducts(category))
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct();
    }, [category])

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
            <Block flex={false} row color={theme.colors.dark} space="between" style={styles.header}>
                <Block center middle flex={false} color={theme.colors.dark} style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.replace("Category")}>
                        <Icon name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>
                </Block>
                <Block middle flex={false} color={theme.colors.dark} style={styles.headerRight}>
                    <Button style={styles.search} onPress={() => navigation.navigate("Search")}>
                        <Icon name="search1" size={16} color={theme.colors.gray2} style={{ marginRight: 3 }} />
                        <Text color={theme.colors.gray2} size={theme.sizes.title}> Search </Text>
                    </Button>
                </Block>
            </Block>
            { loading ? <ActivityIndicator size="large" color={theme.colors.secondary} /> : <Block center style={{ marginTop: 10 }}>
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
    headerRight: {
        width: "80%",
        paddingHorizontal: 5
    },
    search: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10
    }
})


export default ProductsScreen
