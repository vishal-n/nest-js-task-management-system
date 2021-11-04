import { IsNotEmpty } from 'class-validator';

// @IsNotEmpty() -> Specified to validate the fields to ensure they are not empty while creating 
// a new task
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
