import React, { useState } from "react";
import * as Headers from "../constants/header";
import uuid from 'react-native-uuid';
import ScheduledTask from "../components/ScheduledTask";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MyTheme } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AudioRecorder from "../components/AudioRecorder";

const PumpSchedule = () => {

    const navigation = useNavigation(); 

    initialTasks = [
        // {
        //     type: "daily",
        //     startTime: "10:00", // 10h00m
        //     duration: 20 // in seconds  
        // },
        // {
        //     type: "weekly",
        //     weekdays: [2, 3], // Mon, Tue,
        //     startTime: "10:00",
        //     duration: 20
        // },
        // {
        //     type: "monthly",
        //     days: [2, 3, 4], // 2nd, 3rd, 4th day of month
        //     startTime: "10:00",
        //     duration: 20
        // }
    ]

    const FILTER_MAP = {
        All: () => true,
        Daily: (task) => task.type == "daily",
        Weekly: (task) => task.type == "weekly",
        Monthly: (task) => task.type == "monthly"
      };
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const [tasks, setTasks] = useState(initialTasks);
    const [filter, setFilter] = useState("All")

    function addTask(task) {
        const newTask = {
            ...task,
            id: `task-${uuid.v4()}`
        };

        setTasks([...tasks, newTask]);
    }

    // function editTask(editedTask) {
    //     const editedTaskList = tasks.map((task) => {
    //         if (editedTask.id === task.id) {
    //             return editedTask;
    //         }
    //         return task;
    //     });
    //     setTasks(editedTaskList);
    // }

    // function deleteTask(id) {
    //     if (id) {
    //         const remainingTasks = tasks.filter((task) => (id !== task.id));
    //         setTasks(remainingTasks);
    //     } else {
    //         setTasks([]);
    //     }
    // }

    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
        <ScheduledTask />
    ));

    return (
        <View style={styles.container}>
            {/* <Text>Tasks</Text> */}
            <View style={styles.tasks}>
                {taskList}
            </View>
            {/* <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Headers.ADD_SCHEDULED_TASK)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </TouchableOpacity>
            </View> */}
            <View style={styles.audio}>
                <AudioRecorder />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    tasks: {
        // flex: 1
    },
    button: {
        flex: 1
    },
    audio: {
        flex: 1,
        width: '100%'
    }
})

export default PumpSchedule;