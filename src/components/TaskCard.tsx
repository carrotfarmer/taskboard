import {
  Box,
  Center,
  Heading,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Task } from "@doist/todoist-api-typescript";
import React from "react";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const taskColor =
    task.priority === 1
      ? "gray"
      : task.priority === 2
      ? "blue"
      : task.priority === 3
      ? "orange"
      : "red";

  let date;

  if (task.due) {
    date = new Date(task.due?.date as string);
  } else {
    date = null;
  }

  return (
    <Box
      p="5"
      borderWidth={2}
      boxShadow="xl"
      w="16rem"
      borderRadius="xl"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onClick={() => {
        window.open(task.url);
      }}
    >
      <Center>
        <Heading fontSize="xl" color={`${taskColor}.300`}>
          {task.content}
        </Heading>
      </Center>
      <Center>
        <Box p="5">
          <Text fontSize="sm" color="gray.300">
            {task.description}
          </Text>
          <Wrap spacing={5} pt="2" direction="row">
            {task.labels.map((label) => (
              <WrapItem>
                <Tag size="sm">{label}</Tag>
              </WrapItem>
            ))}
          </Wrap>
          {task.due && (
            <Text pt="5" fontSize="xs">
              {/* Due: {`${date}`} */}
              {/* convert date to long format and render */}
              Due: {date?.toLocaleString("en-US", { dateStyle: "long" })}
            </Text>
          )}
        </Box>
      </Center>
    </Box>
  );
};
