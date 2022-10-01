import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Task, TodoistApi } from "@doist/todoist-api-typescript";
import React, { useEffect, useState } from "react";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>();
  const [quote, setQuote] = useState<any>();
  const [apiToken, setApiToken] = useState<string>("");

  const token = localStorage.getItem("token") as string;
  // call this once on page load
  useEffect(() => {
    const todoistApi = new TodoistApi(token);

    todoistApi.getTasks().then((tasks: Task[]) => {
      if (typeof tasks != "undefined" && tasks.length > 0) {
        setTasks(tasks);

        // cache tasks in local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        // load tasks from local storage
        const cachedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(cachedTasks);
      }
    });

    // fetch from quotable.io/random and modify state
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data);
      });
  }, []);

  return (
    <div className="App">
      {token ? (
        <>
          <Center>
            <Heading size="3xl" pt="10">
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Heading>
          </Center>
          <Center p="5">
            {/* display quote */}
            <Heading size="md" pt="10" color="yellow.300">
              "{quote?.content}"
            </Heading>
          </Center>
          <Center pt="2">
            <Text fontWeight="bold">- {quote?.author}</Text>
          </Center>
          <SimpleGrid columns={5} spacing={3} p={5} pl={10}>
            {tasks?.map((task: Task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </SimpleGrid>
        </>
      ) : (
        <>
          <Center>
            <Heading size="3xl" pt="10">
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Heading>
          </Center>
          <Center>
            {/* display quote */}
            <Heading size="md" pt="10" color="yellow.300">
              "{quote?.content}"
            </Heading>
          </Center>
          <Center pt="2">
            <Text fontWeight="bold">- {quote?.author}</Text>
          </Center>

          <Center pt="10">
            <FormControl boxSize="xs">
              <FormLabel>Enter your Todoist API token</FormLabel>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setApiToken(e.currentTarget.value);
                }}
              />
              <Box pt="5">
                <Button
                  onClick={() => {
                    if (apiToken && apiToken.length > 39) {
                      localStorage.setItem("token", apiToken);
                      window.location.reload();
                    } else {
                      alert("Invalid API token");
                    }
                  }}
                >
                  Done
                </Button>
              </Box>
            </FormControl>
          </Center>
        </>
      )}
    </div>
  );
}

export default App;
