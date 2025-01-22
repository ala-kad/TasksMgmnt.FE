import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNg Imports
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule, ConfirmDialog} from 'primeng/confirmdialog';
// Services
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-delete-dialog',
  imports: [
    ConfirmDialog,
    ToastModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
  providers: [ConfirmationService, MessageService, TaskService],
})
export class TaskDeleteDialogComponent implements OnInit{
  @Input() taskId!: number;
  visible: boolean = false;

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task ?',
      header: 'Delete task',
      icon: 'pi pi-info-trash',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.taskService.deleteTask(this.taskId).subscribe({
          next: () => {         
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted' });
            this.router.navigate(['/']).then(() => {  window.location.reload(); } );
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an error deleting the task' });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    },);
  }
}
