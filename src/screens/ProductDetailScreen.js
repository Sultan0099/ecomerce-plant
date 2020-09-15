import React, { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'

import { Block, Text, Button } from '../components/common'
import { theme } from '../constants'
import { singleProduct } from "../redux/actions/products"

const ProductDetailScreen = (props) => {
    const { navigation } = props;
    const productId = navigation.getParam("productId");


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

    if (loading) return <Text> Fetching your product </Text>

    return (
        <Block center style={{ marginTop: 10, padding: 20, backgroundColor: "white" }}>
            <Block flex={false} style={styles.media}>
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                        uri: product.productPic[0].path
                    }}
                />
            </Block>
            <Text h1 style={{ marginTop: 5 }}>{product.name.toUpperCase()} </Text>

            <Block center flex={false} style={{ width: "50%", marginVertical: 10 }}>
                <Text h1 bold color={theme.colors.secondary} style={{ textAlign: "center" }}>${product.price}/- </Text>
            </Block>
            <Block center flex={false} style={{ width: "80%", marginVertical: 10 }}>
                <Text body style={{ textAlign: "center" }}>{product.description} </Text>
            </Block>
            <Block >
                <Button >
                    <Text >
                        Buy Now
                </Text>
                </Button>
            </Block>
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
    }
})

export default ProductDetailScreen
