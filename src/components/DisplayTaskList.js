import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color, space, db } from '../styles/color';
import Lottie from 'lottie-react-native';

export default function DisplayTaskList({ task, updateTask }) {

    if (task.length == 0) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textStyle}>No Task</Text>
            <Lottie
                style={{
                    height: space.height / 3,
                    width: space.width / 3
                }}
                autoPlay loop
                source={require('../assets/noTask.json')}
            />
        </View>
    );
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={task}
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => {
                return (
                    <View style={styles.card} key={item.Id}>
                        <View style={{ flexDirection: "row" }}>
                            {/* Display Check Box and taskname  */}
                            {/* <Icon name='check-square' style={{ color: '#7d80b2', alignSelf: 'center' }} /> */}
                            <CheckBox
                                onValueChange={() => updateTask(item.Id)}
                            />
                            <Text style={styles.textStyle}>{item.TaskName}</Text>
                            {/* Display Edit and delete */}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Icon name='edit' style={styles.iconStyle} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 10 }}>
                                <Icon name='trash' style={styles.iconStyle} />
                            </TouchableOpacity>
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
        fontSize: 20
    }
})