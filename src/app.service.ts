import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('TASKS') private tasks: any[]) {}

  getHello(): string {
    console.log(this.tasks);
    return 'Hello World!';
  }
}
