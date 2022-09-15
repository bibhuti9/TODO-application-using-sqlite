import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './src/components/AddTask';
import DisplayTaskList from './src/components/DisplayTaskList';
import ShowDeletedTask from './src/components/ShowDeletedTask';
import { color, space, db } from './src/styles/color';
import sqlite from 'react-native-sqlite-storage';
export default function App() {
  const [visible, setVisible] = useState(true);
  const [task, setTask] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);

  // Delete Database 
  const deleteDatabase = () => {
    sqlite.deleteDatabase(
      { name: 'mainDB', location: 'default' },
      () => { console.log('db deleted'); },
      error => {
        console.log("ERROR: " + error);
      }
    );
  }


  useEffect(() => {
    selectTask();
    selectCompletedTask();
    // deleteDatabase();
  }, [])

  // Select Task
  const selectTask = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Task where isDelete=0",
        [],
        (err, result) => {
          setTask(result.rows.raw());
        }
      )
    })
  }

  const selectCompletedTask = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Task where isDelete=1",
        [],
        (err, result) => {
          setDeletedTask(result.rows.raw());
        }
      )
    })
  }


  const updateTask = (Id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Task set isDelete = 1 where Id = ?",
        [Id],
        (err, result) => {
          selectTask();
          selectCompletedTask();
        }
      )
    })
  }


  return (
    <View style={{ flex: 1, }}>
      {/* Display Completed Task & Add Task  */}
      <ImageBackground source={require('./src/assets/taskBackground.jpg')} style={styles.imageBackground}>
        <AddTask visible={visible} selectTask={selectTask} />
        <ShowDeletedTask deletedTask={deletedTask} visible={visible} />
      </ImageBackground>
      {/* Display All Un Completed Task */}
      <View style={{ flex: 1, }}>
        <DisplayTaskList task={task} updateTask={updateTask} />
      </View>
      {/* Add Button */}
      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.plusButton}>
        <Icon name='plus' style={{ fontSize: 25 }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primarr_color,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})