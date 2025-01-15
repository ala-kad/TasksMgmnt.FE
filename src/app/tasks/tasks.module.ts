import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [ ],
  imports: [
    TasksRoutingModule,
    CommonModule,
    DatePipe,
  ],
  providers: [],
  exports: []
})
export class TasksModule { }
