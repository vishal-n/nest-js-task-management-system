import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
//import { title } from 'process';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // To get all the tasks created
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // To get a specific task by id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // To create a new task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
