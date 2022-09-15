import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color, space } from '../styles/color';

export default function ShowDeletedTask({ visible, deletedTask }) {

    console.log(deletedTask);

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{ display: visible ? 'flex' : 'none' }}
            data={deletedTask}
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => {
                return (
                    <View style={styles.card} key={item.Id}>
                        <View style={{ flexDirection: "row" }}>
                            {/* Display Check Box and taskname  */}
                            {/* <Icon name='check-square' style={{ color: '#7d80b2', alignSelf: 'center' }} /> */}
                            <Text style={styles.textStyle}>{item.TaskName}</Text>
                            {/* Display Edit and delete */}
                        </View>
                    </View>)
            }}
        />
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: space.width / 1.3
    },
    iconStyle: {
        fontSize: space.xl + 4
    },
    textStyle: {
        marginHorizontal: 10,
        alignSelf: 'center',
        fontSize: 20,
        color: color.text_color,
        textDecorationLine: 'line-through',
    }
})