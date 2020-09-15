
import React from "react";

import { StyleSheet, ScrollView, Text } from 'react-native';
import { Block } from "../components/common";

import { theme, mocks } from "../constants";

import CategoryCard from '../components/CategoryCard';


const CategoryScreen = (props) => {
    return (
        <Block style={styles.categoryContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingVertical: theme.sizes.base * 2 }}
            >
                <Block flex={false} row space="between" style={styles.categories}>

                    {mocks.categories.map((category, index) => (
                        <CategoryCard {...props} key={`item-${category.id}`} img={category.image} name={category.name} count={category.count} />

                    ))}
                </Block>
            </ScrollView>
        </Block>
    )
};

const styles = StyleSheet.create({
    categoryContainer: {
        paddingHorizontal: theme.sizes.base
    },
    categories: {
        flexWrap: "wrap",
        marginBottom: theme.sizes.base * 3.5
    }

});
export default CategoryScreen; 