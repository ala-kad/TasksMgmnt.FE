import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
// PrimeNg Modules
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../task.service';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ToastModule } from 'primeng/toast';

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
export class TaskFormComponent {
  private formBuilder = inject(FormBuilder);
  taskForm: FormGroup;
  visible: boolean = false;

  constructor(
    private taskService: TaskService,
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

 
}
