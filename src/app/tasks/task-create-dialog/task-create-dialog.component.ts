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
 
  show() {
    this.ref = this.dialogService.open(TaskFormComponent, {
      header: 'Create a new Task',
      width: '50vw',
      height: '50vh',
      closable: true,
      closeOnEscape: true,
      // modal:true,
      // contentStyle: { overflow: 'auto' },
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
}
