import { Component, OnDestroy  } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-create-dialog',
  imports: [
    ConfirmDialog,
    ToastModule,
    ButtonModule,
  ],
  providers: [ConfirmationService, MessageService, DialogService],
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.css',
})
export class TaskCreateDialogComponent implements OnDestroy {
  ref: DynamicDialogRef | undefined;

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    public dialogService: DialogService,
  ) {}
 


  openDialog() {
    this.dialogService.open(TaskFormComponent, {
      header: 'Create Task', 
      width: '400px', 
    });
  }

  show() {
    this.ref = this.dialogService.open(TaskFormComponent, {
        header: 'Create a  newTask',
        width: '50vw',
        closable: true,
        closeOnEscape: true,
        modal:true,
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
        
    })
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to create this task?',
      header: 'Create task',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'danger',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Create',
        severity: 'success',
      },

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task created' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }
}
