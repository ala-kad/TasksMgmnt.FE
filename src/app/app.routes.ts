import { Routes } from '@angular/router';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)},
    { path: 'new-task', component: TaskFormComponent },
];
