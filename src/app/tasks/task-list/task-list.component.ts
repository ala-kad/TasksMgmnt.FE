import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient  } from '@angular/common/http';
// PrimeNg Modules
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// Components
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteDialogContainerComponent } from '../delete-dialog-container/delete-dialog-container.component';

import { Task } from '../Task';
import { TaskService } from '../task.service';


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
    TaskFormComponent,
    DeleteDialogContainerComponent
  ],
  providers: [MessageService, TaskService, ConfirmationService, HttpClient],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks!: Task[];
  statuses!: SelectItem[];
  clonedTasks: { [s: string]: Task } = {};
  id: any;
  @Output() idEvent = new EventEmitter<any>();

  constructor( 
    private messageService: MessageService,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.statuses = [
      { label: 'Completed', value: true },
      { label: 'Incompleted', value: false }
    ];

    this.getAllTasks();
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

  sendTaskId(id: any) {
    this.id = id;
  }

  emitTaskID(id: any) { 
    this.idEvent.emit(id);
  }
  
  getAllTasks() { 
    this.taskService.getTasks().subscribe(
      {
        next: (data) => {
          this.tasks = data;
        },
      },
    )
  }

}
