import { Component, Input, OnInit } from '@angular/core';
// PrimeNg Imports
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-dialog',
  imports: [
    ConfirmDialog,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
  providers: [ConfirmationService, MessageService, TaskService],
})
export class TaskDialogComponent implements OnInit{
  @Input() taskId!: number;
  visible: boolean = false;

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task?',
      header: 'Delete task',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.taskService.deleteTask(this.taskId).subscribe({
          next: (data) => {         
            console.log('Task deleted', data);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted' });
          }
        })
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    },);
  }

  showDialog() {
    this.visible = true;
  }

}
