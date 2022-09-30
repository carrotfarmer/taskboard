import { Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Task, TodoistApi } from "@doist/todoist-api-typescript";
import React, { useEffect, useState } from "react";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>();
  const [quote, setQuote] = useState<any>();

  // call this once on page load
  useEffect(() => {
    const token = process.env.REACT_APP_TODOIST_TOKEN as string;
    const todoistApi = new TodoistApi(token);

    todoistApi.getTasks().then((tasks: Task[]) => {
      if (typeof tasks != "undefined" && tasks.length > 0) {
        setTasks(tasks);

        // cache tasks in local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        // load tasks from local storage
        console.log("Loading tasks from local storage");
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
      {/* display time in a beautiful way */}
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
      <SimpleGrid columns={5} spacing={5} p={5} pl={10}>
        {tasks?.map((task: Task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default App;
