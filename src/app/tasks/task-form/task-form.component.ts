import { Component, inject, OnDestroy } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
// PrimeNg Modules
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ToastModule } from 'primeng/toast';
import { MessageService, SelectItem, ConfirmationService} from 'primeng/api';

import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    Dialog,
    ToastModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class TaskFormComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  taskForm: FormGroup;
  visible: boolean = false;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private router: Router,
  ) { 
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }


  onSubmit() {
    this.taskService.createTask(this.taskForm.value).subscribe(
      {
        next: (data) => { 
         this.visible = false;  
         console.log('Success: ', data)
         this.router.navigate(['/']).then(() => {
            window.location.reload();
          })
        }
      }
    )
  }

  get name(): FormControl {
    return this.taskForm.get('name') as FormControl;
  }

  showDialog() {
    this.visible = true;
  }

  ngOnDestroy(): void {
    this.visible = false;
  }

  confirmMsg() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Task Created'});
  }
 
  cancelMsg() {
    this.messageService.add({severity:'warn', summary:'Cancel', detail:'Task Creation Cancelled'});
  }
 
}
