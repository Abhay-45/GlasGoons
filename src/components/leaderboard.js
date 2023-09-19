// import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Progress, Divider, Button } from "@chakra-ui/react";
import { getTop3SubgoalIds } from "../util/top3ByCat";
import Navbar from "./navbar";

function Leaderboard() {
    const [userTotal, setUserTotal] = useState(0);
    const [topScorers, setTopScorers] = useState([]);
    const [popularTasks, setPopularTask] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://tolerant-guinea-21.hasura.app/api/rest/getTotalPointsForUser",
                {
                    headers: {
                        "content-type": "application/json",
                        "x-hasura-admin-secret":
                            "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY",
                    },
                    params: {
                        user_id: 1,
                    },
                }
            )
            .then((res) => {
                setUserTotal(res.data.user[0].user_total_points);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("https://tolerant-guinea-21.hasura.app/api/rest/getPopularTask", {
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret":
                        "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY",
                },
            })
            .then((res) => {
                setPopularTask(getTop3SubgoalIds(res.data));
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(
                "https://tolerant-guinea-21.hasura.app/api/rest/getSubgoalIdsCompletedByUser",
                {
                    headers: {
                        "content-type": "application/json",
                        "x-hasura-admin-secret":
                            "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY",
                    },
                    params: {
                        user_id: 1,
                    },
                }
            )
            .then((res) => {
                setCompletedTasks(res.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                "https://tolerant-guinea-21.hasura.app/api/rest/getSubgoalIdsCompletedByUser",
                {
                    headers: {
                        "content-type": "application/json",
                        "x-hasura-admin-secret":
                            "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY",
                    },
                    params: {
                        user_id: 1,
                    },
                }
            )
            .then((res) => {
                setCompletedTasks(res.data.result);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("https://tolerant-guinea-21.hasura.app/api/rest/getTopScorers", {
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret":
                        "3a672X9jcnXwyR4tTo7a8OJMUQqsrLvcwQb05Kd6erC9vddLLM1pGs5nwR65hlvY",
                },
            })
            .then((res) => {
                setTopScorers(res.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <Box h="100vh" minH={"100%"} bg="gray.100">
                <Box p="4" width={"100%"} display={"flex"} flexDirection={"row"}>
                    <Box>
                        <Box
                            bg="white"
                            px="35px"
                            py="15px"
                            borderRadius={"16px"}
                            height={"fit-content"}
                            width={"fit-content"}
                        >
                            <Text fontSize={"2xl"}>You have</Text>
                            <Box
                                display={"flex"}
                                flexDirection={"row"}
                                color={"gray.500"}
                                fontSize={"xl"}
                            >
                                <Text>{userTotal}</Text>
                                <Text ml="10px">points!!</Text>
                            </Box>
                        </Box>

                        <Box
                            mt="30px"
                            px="35px"
                            py="15px"
                            borderRadius={"16px"}
                            bg="white"
                            textAlign={"start"}
                        >
                            <Text fontSize={"2xl"}>Leaderboard</Text>
                            {topScorers.map((elem, i) => (
                                <Box
                                    mt="10px"
                                    display={"flex"}
                                    flexDirection={"row"}
                                    justifyContent={"space-between"}
                                    gap={"20px"}
                                    width={"100%"}
                                    color={"gray.500"}
                                    fontSize={"xl"}
                                >
                                    <Text>
                                        {i + 1}. {elem.user_name}
                                    </Text>
                                    <Text textAlign={"right"}>{elem.user_total_points}</Text>
                                </Box>
                            ))}
                        </Box>

                        <Box
                            mt="30px"
                            px="35px"
                            py="15px"
                            borderRadius={"16px"}
                            bg="white"
                            textAlign={"start"}
                        >
                            <Text fontSize={"2xl"}>Tasks Completed</Text>
                            <Box height={200} overflow={"scroll"}>


                                {completedTasks.map((elem) => (
                                    <Box
                                        mt="10px"
                                        display={"block"}
                                        flexDirection={"column"}
                                        color={"gray.500"}
                                        fontSize={"xl"}
                                    >
                                        <Text>&#9989; {elem.subgoal.subgoal_name}</Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box
                            mt="30px"
                            px="35px"
                            py="15px"
                            borderRadius={"16px"}
                            bg="white"
                            textAlign={"start"}
                        >
                            <Text fontSize={"2xl"}>Popular Tasks</Text>
                            {popularTasks.map((elem, i) => (
                                <Box
                                    mt="10px"
                                    display={"block"}
                                    flexDirection={"column"}
                                    color={"gray.500"}
                                    fontSize={"xl"}
                                >
                                    <Text>{i + 1}. {elem}</Text>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box ml="10px" width={"50%"}>
                        <Box bg="white" px="35px" py="15px" borderRadius={"16px"}>
                            <Text fontSize={"2xl"}>Offers</Text>

                            <Box mt={"15px"} fontSize={"xl"} textAlign={"start"}>
                                <Text>$25 Asda Voucher</Text>
                                <Progress value={100} colorScheme='green' />
                                <Button mt={5} colorScheme='teal' variant='solid' onClick={() => alert("Product Redeemed")}>
                                    Redeem
                                </Button>
                            </Box>

                            <Divider my={"5"} />

                            <Box mt={"15px"} fontSize={"xl"} textAlign={"start"}>
                                <Text>10% Tax reduction</Text>
                                <Progress value={2} colorScheme='facebook' />
                                <Button mt={5} colorScheme='teal' variant='outline' onClick={() => alert("Not enough points")}>
                                    Redeem
                                </Button>
                            </Box>

                            <Divider my={"5"} />

                            <Box mt={"15px"} fontSize={"xl"} textAlign={"start"}>
                                <Text>1 month bus pass</Text>
                                <Progress value={35} colorScheme='blue' />
                                <Button mt={5} colorScheme='teal' variant='outline' onClick={() => alert("Not enough points")}>
                                    Redeem
                                </Button>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </>

    );
}

export default Leaderboard;
