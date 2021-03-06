import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
//import { title } from 'process';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // To get all the tasks created
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // If we have any filters defined, call tasksService.getTasksWithFilters
    // otherwise, just get all the tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
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

  // To delete a given task by id
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  // To update the status of a given task by id
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
