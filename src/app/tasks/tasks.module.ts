import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [ ],
  imports: [
    TasksRoutingModule,
    CommonModule,
    DatePipe,
  ],
  providers: [provideHttpClient(
    withFetch(),
  ),],
  exports: []
})
export class TasksModule { }
