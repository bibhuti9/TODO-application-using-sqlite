import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import { color, db } from '../styles/color';
const { width, height } = Dimensions.get('screen');


export default function AddTask({ visible, selectTask }) {
    const [taskName, setTaskName] = useState("");
    useEffect(() => {
        createTable();
    }, []);
    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Task "
                + "(Id INTEGER PRIMARY KEY AUTOINCREMENT, TaskName TEXT,isDelete BOOLEAN);"
            )
        })
    }

    const addTask = async () => {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO Task (TASKNAME,isDelete) VALUES (?,?)",
                [taskName, false],
                () => {
                    selectTask();
                }
            )
        })
    }

    return (
        <View style={[styles.card, { display: visible ? 'none' : 'flex', }]}>
            {/* Text Input */}
            <View style={styles.inputStyle}>
                <Icon name='tasks' style={styles.iconStyle} />
                <TextInput onChangeText={(value) => setTaskName(value)} style={{ flex: 1, }} placeholde="Enter Task Name" />
            </View>
            {/* Add Button */}
            <TouchableOpacity style={styles.addTaskButtonStyle} onPress={addTask}>
                <Text style={{ color: color.text_color }}>Add Task</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: width / 1.1,
        height: height / 3.5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1.5,
        shadowRadius: 0,
        shadowColor: '#fff'
    },
    inputStyle: {
        backgroundColor: '#eaeaea',
        width: width / 1.5,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 5,
    },
    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 5
    },
    addTaskButtonStyle: {
        width: width / 1.8,
        marginVertical: 10,
        backgroundColor: color.primarr_color,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    }
})