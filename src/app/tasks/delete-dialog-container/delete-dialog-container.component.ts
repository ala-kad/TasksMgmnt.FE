import { Component, Input, OnInit } from '@angular/core';
// PrimeNg Modules
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
// Components Imports
import { TaskDialogComponent } from '../task-delete-dialog/task-delete-dialog-dialog.component';

@Component({
  selector: 'app-delete-dialog-container',
  imports: [
    ConfirmDialog,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './delete-dialog-container.component.html',
  styleUrl: './delete-dialog-container.component.css',
  providers: [
    DialogService,
  ]
})
export class DeleteDialogContainerComponent implements OnInit{
  @Input() id: any;
  ref: DynamicDialogRef | undefined;
  @Input() taskId : any;

  constructor(
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
  }


  show() {
      this.ref = this.dialogService.open(TaskDialogComponent, {
        data: {
          id: this.id,
        },
        header: 'Delete Task',
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
