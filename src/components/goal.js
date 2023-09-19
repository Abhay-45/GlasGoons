// import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    Box,
    Button,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Checkbox,
    FormControl,
    FormLabel,
    Flex,
    Grid,
    Text
} from "@chakra-ui/react";
import Navbar from "./navbar";


function Goal() {
    const [goal, setGoals] = useState([]);
    const [userGoal, setUserGoal] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [newCompleteGoal, setNewCompleteGoal] = useState([]);
    const [isOpen, setIsOpen] = useState(true); // initial state is open

    const handleAccordionToggle = () => {
        setIsOpen(isOpen);
    };

    useEffect(() => {
        axios.get("https://tolerant-guinea-21.hasura.app/api/rest/getGoals",
            {
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY"
                }
            }
        ).then((res) => {
            console.log(res.data.goal)
            console.log(typeof (res.data.goal))
            setGoals(res.data.goal);
            console.log(goal)

        })
            .catch((error) => {
                console.log(error)
            })
    }, []);


    const handleCheckboxChange = (subgoalId) => {
        if (checkboxes.includes(subgoalId)) {
            setCheckboxes(checkboxes.filter((id) => id !== subgoalId));
        } else {
            setCheckboxes([...checkboxes, subgoalId]);
        }
    };

    const handleNewCompleteGoalChange = (e) => {
        console.log(e.target.value);
        setNewCompleteGoal([e.target.value, ...newCompleteGoal]);
    };

    const handleSubmit = async () => {
        newCompleteGoal.forEach(subID => (
            axios.post("https://tolerant-guinea-21.hasura.app/api/rest/completeGoal",
                {
                    user_id: 1,
                    subgoal_id: subID
                },
                {
                    headers: {
                        "content-type": "application/json",
                        "x-hasura-admin-secret": "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY"
                    }
                },
            ).then(() => {
                axios.patch(

                    "https://tolerant-guinea-21.hasura.app/api/rest/addPointsToUser",
                    { user_id: 1 },
                    {
                        headers: {
                            "content-type": "application/json",
                            "x-hasura-admin-secret": "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY"
                        }
                    }).then(() => {
                        alert("Submitted Successfully!")
                    })
            })

            // then(() => {
            //     setNewCompleteGoal(newCompleteGoal);
            //     setIsOpen(false);
            //     axios.get("https://tolerant-guinea-21.hasura.app/api/rest/getGoals",
            //         {
            //             headers: {
            //                 "content-type": "application/json",
            //                 "x-hasura-admin-secret": "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY"
            //             }
            //         }
            //     ).then((res) =>
            //         setUserGoal(res.data)
            //     )

            // }).catch((error) => {
            //     console.log(error)
            // })
        ))
        console.log('success')

    };


    // const handleCheckboxChange = (index) => {
    //     setCheckboxes((prevState) => {
    //         const newCheckboxes = [...prevState];
    //         newCheckboxes[index].isChecked = !prevState[index].isChecked;
    //         return newCheckboxes;
    //     });
    // };


    return (
        <>
            <Navbar></Navbar>
            <Box
                // w="33.33%"
                h="100vh"
                minH={"100%"}
                bg="gray.100"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >

                <Accordion allowToggle bg={'#e9ebe8'} h={"100vh"} w={"100vw"} p={4}>
                    {/* {Object.values(goal).forEach(goalItem => ( */}
                    <Flex flexWrap='wrap'>
                        {goal.map((goalItem) => (

                            <Box key={goalItem.goal_id} flex='0 0 33.33%' px={2}>
                                <AccordionItem my={"30px"} bg={''} borderRadius={10}>
                                    <Text bg={'white'} minH={"130px"} px={5} py={5} borderTopRadius={10} >{goalItem.goal_name}</Text>
                                    <h2>
                                        <AccordionButton bg={'rgb(25, 47, 68)'} color={"white"} borderBottomRadius={10} onClick={handleAccordionToggle}>
                                            <Box flex="1" textAlign="left">
                                                {/* Select options: */}
                                                {/* {goalArr.goal_name} */}
                                                <Text textAlign={'center'}>Ways to Contribute</Text>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} bg={"white"} borderBottomRadius={10} isOpen={isOpen}>
                                        <FormControl>
                                            {/* {goalItem.forEach(subgoal =>( */}
                                            {goalItem.subgoals.map((subgoal) => (
                                                <Box key={subgoal.subgoal_id} mb={2}>
                                                    <Checkbox
                                                        // isChecked={Math.random() < 0.5} 
                                                        defaultChecked={Math.random() < 0.4}

                                                        onChange={handleNewCompleteGoalChange}
                                                        value={subgoal.subgoal_id}
                                                    >
                                                        {subgoal.subgoal_name}
                                                    </Checkbox>
                                                </Box>
                                            ))}
                                            <Button mt={4} onClick={handleSubmit} justifyContent={'center'}>
                                                Submit
                                            </Button>
                                        </FormControl>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>
                        ))}
                    </Flex>


                </Accordion>



            </Box>
        </>

    );
}

export default Goal;