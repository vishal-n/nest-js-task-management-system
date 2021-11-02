import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Returns all the tasks created
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Returns a task by id
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  // Creates a new task task and pushed it to the array
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
}
