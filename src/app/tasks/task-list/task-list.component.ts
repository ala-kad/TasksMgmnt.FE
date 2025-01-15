import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

// PrimeNg Modules
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { TaskDialogComponent } from '../task-delete-dialog/task-delete-dialog.component';

import { TaskCreateDialogComponent } from '../task-create-dialog/task-create-dialog.component'


interface Task {
  id: number,
  name: string,
  completed: boolean,
  creationDate: Date
}

@Component({
  selector: 'app-task-list',
  // standalone: true,
  imports: [
    IconFieldModule, 
    InputIconModule, 
    TagModule,
    ToastModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    FormsModule,
    DatePipe,
    CommonModule,
    TaskDialogComponent,
    TaskCreateDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks!: Task[];
  statuses!: SelectItem[];
  clonedTasks: { [s: string]: Task } = {};

  constructor(
    private messageService: MessageService,
  ) {
    this.tasks = [
      { id: 1, name: 'Task 1', completed: true, creationDate: new Date() },
      { id: 2, name: 'Task 2', completed: true, creationDate: new Date() },
      { id: 3, name: 'Task 3', completed: true, creationDate: new Date() },
      { id: 4, name: 'Task 4', completed: false, creationDate: new Date() },
      { id: 5, name: 'Task 5', completed: false, creationDate: new Date() },
      { id: 6, name: 'Task 6', completed: false, creationDate: new Date() },
    ];
  }

  ngOnInit() {
    this.statuses = [
      { label: 'Completed', value: true },
      { label: 'Incompleted', value: false }
    ];
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';

      case false:
        return 'danger';
    }
  }

  onRowEditInit(task: Task) {
    this.clonedTasks[task.id as number] = { ...task };
  }

  onRowEditSave(task: Task) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task is updated' });
  }

  onRowEditCancel(task: Task, index: number) {
    this.tasks[index] = this.clonedTasks[task.id as number];
    delete this.clonedTasks[task.id as number];
  }

}
