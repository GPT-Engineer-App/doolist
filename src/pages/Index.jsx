import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, Flex, IconButton, Spacer, Checkbox, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const updateTask = (id, text) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
    setEditTask(null);
  };

  return (
    <Box maxWidth="600px" margin="auto" mt={8} p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        To-Do List
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex>
          <Input placeholder="Enter a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} mr={4} />
          <Button type="submit" colorScheme="blue" leftIcon={<FaPlus />}>
            Add Task
          </Button>
        </Flex>
      </form>
      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Pending Tasks
        </Heading>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <Flex key={task.id} alignItems="center" mb={2}>
              <Checkbox isChecked={task.completed} onChange={() => toggleComplete(task.id)} mr={4} />
              {editTask === task.id ? <Input value={task.text} onChange={(e) => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, text: e.target.value } : t)))} onBlur={() => updateTask(task.id, task.text)} autoFocus /> : <Text>{task.text}</Text>}
              <Spacer />
              <IconButton icon={<FaEdit />} aria-label="Edit task" onClick={() => setEditTask(task.id)} mr={2} />
              <IconButton icon={<FaTrash />} aria-label="Delete task" onClick={() => deleteTask(task.id)} />
            </Flex>
          ))}
      </Box>
      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Completed Tasks
        </Heading>
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <Flex key={task.id} alignItems="center" mb={2}>
              <Checkbox isChecked={task.completed} onChange={() => toggleComplete(task.id)} mr={4} />
              <Text textDecoration="line-through">{task.text}</Text>
              <Spacer />
              <IconButton icon={<FaTrash />} aria-label="Delete task" onClick={() => deleteTask(task.id)} />
            </Flex>
          ))}
      </Box>
    </Box>
  );
};

export default Index;
