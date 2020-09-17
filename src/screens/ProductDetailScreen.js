import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';


import { Block, Text, Button } from '../components/common'
import { theme } from '../constants'
import { addToCart } from '../redux/actions/cart';
import { singleProduct } from "../redux/actions/products"

const { height } = Dimensions.get("screen")

const ProductDetailScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const productId = navigation.getParam("productId");
    const user = useSelector(state => state.auth.user)

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({})

    const fetchSingleProduct = async () => {
        const productRes = await singleProduct(productId)
        if (productRes.err) {
            console.log(productRes.err);
        } else {
            setProduct(productRes.res.data.product)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSingleProduct()
    }, [productId])

    const handleNavigation = () => {
        if (user) {
            navigation.navigate("Order")
        } else {
            navigation.navigate("Auth")
        }
    }

    const handleAddToCart = async () => {
        if (user) {
            const data = await dispatch(addToCart({ product: productId, price: product.price, quantity: 1 }));
            console.log(data)
        } else {
            navigation.navigate("Auth")
        }
    }

    if (loading) return <ActivityIndicator size="large" color={theme.colors.secondary} />

    return (
        <Block flex={false}>
            <ScrollView contentContainerStyle={{
                width: "100%", height: height,
                marginTop: 5,
                padding: 10,
                backgroundColor: "white",
                justifyContent: 'center',
                alignItems: "center"
            }}>

                <Block flex={false} style={styles.media
                } >
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{
                            uri: product.productPic[0].path
                        }}
                    />
                </Block >
                <Text h1 style={{ marginTop: 5 }}>{product.name.toUpperCase()} </Text>

                <Block center flex={false} style={{ width: "50%", marginVertical: 10 }}>
                    <Text h1 bold color={theme.colors.secondary} style={{ textAlign: "center" }}>${product.price}/- </Text>
                </Block>
                <Block center flex={false} style={{ width: "80%", marginVertical: 10 }}>
                    <Text body style={{ textAlign: "center" }}>{product.description} </Text>
                </Block>
                <Block >
                    <Button gradient
                        style={{ width: 200, paddingVertical: 3, paddingHorizontal: 10, borderRadius: 40 }}
                        onPress={handleNavigation}
                    >
                        <Text white h2 center>
                            Buy Now
                    </Text>
                    </Button>
                    <Button gradient
                        style={{ width: 200, paddingVertical: 3, paddingHorizontal: 10, borderRadius: 40 }}
                        onPress={handleAddToCart}
                    >
                        <Text white h2 center>
                            Add To Cart
                    </Text>
                    </Button>

                </Block>
            </ScrollView >
        </Block>
    )
}

ProductDetailScreen.navigationOptions = ({ navigation }) => {
    const productName = navigation.getParam("productName")
    return {
        headerTitle: productName.toUpperCase(),
    }
}

const styles = StyleSheet.create({
    media: {
        height: "50%",
        width: "100%",
    },
    instagramButton: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 20
    }
})

export default ProductDetailScreen
