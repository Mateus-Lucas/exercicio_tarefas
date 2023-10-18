import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home'
import Tarefas from '../screens/Tarefas'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Carros'>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Tarefas" component={Tarefas} />
        </Drawer.Navigator>
    )
}