import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'


const { width } = Dimensions.get('screen');
export default function AddData({ visible }) {
    return (
        <View style={styles.card}>
            <Text>AddData</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        elevation: 10,
        backgroundColor: '#fff',
        width: width / 2,
    }
})