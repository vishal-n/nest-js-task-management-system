import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Returns all the tasks created
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Returns a task by id
  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return foundTask;
  }

  // Returns a task based on filters
  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    // return final result
    return tasks;
  }

  // Creates a new task task and pushes it to the array
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // Deletes a given task
  deleteTask(id: string): void {
    const taskToBeDeleted = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskToBeDeleted.id);
  }

  // Updates a task's status by id
  updateTaskStatus(id: string, new_status: TaskStatus): Task {
    const givenTask = this.getTaskById(id);
    givenTask.status = new_status;
    return givenTask;
  }
}
