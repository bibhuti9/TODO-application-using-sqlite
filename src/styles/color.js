import { Dimensions } from "react-native"
import sqlite from 'react-native-sqlite-storage';

export const db = sqlite.openDatabase(
    {
        name: 'mainDB',
        location: 'default'
    },
    () => { console.log('Database COnnected') },
    err => { console.log('Database Error') }
)

export const { width, height } = Dimensions.get('screen');

export const color = {
    primarr_color: "#599dea",
    text_color: '#fff'
}

export const space = {
    m: 10,
    s: 15,
    xl: 20,
    width,
    height
}