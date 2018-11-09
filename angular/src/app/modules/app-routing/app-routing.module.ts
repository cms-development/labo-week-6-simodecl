import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';

import { StudentsComponent } from './../../components/students/students.component';
import { StudentDetailComponent } from './../../components/student-detail/student-detail.component';
import { StudentEditComponent } from './../../components/student-edit/student-edit.component';
import { StudentCreateComponent } from './../../components/student-create/student-create.component';
import { StudentDeleteComponent } from './../../components/student-delete/student-delete.component';

import { CoursesComponent } from './../../components/courses/courses.component';
import { CourseDetailComponent } from './../../components/course-detail/course-detail.component';
import { CourseEditComponent } from './../../components/course-edit/course-edit.component';
import { CourseCreateComponent } from './../../components/course-create/course-create.component';
import { CourseDeleteComponent } from './../../components/course-delete/course-delete.component';

import { InstructorsComponent } from './../../components/instructors/instructors.component';
import { InstructorDetailComponent } from './../../components/instructor-detail/instructor-detail.component';
import { InstructorEditComponent } from './../../components/instructor-edit/instructor-edit.component';
import { InstructorCreateComponent } from './../../components/instructor-create/instructor-create.component';
import { InstructorDeleteComponent } from './../../components/instructor-delete/instructor-delete.component';

import { AuthGuardService as AuthGuard } from './../../services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/create', component: StudentCreateComponent, canActivate: [AuthGuard] },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'students/:id/edit', component: StudentEditComponent, canActivate: [AuthGuard] },
  { path: 'students/:id/delete', component: StudentDeleteComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/create', component: CourseCreateComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/:id/edit', component: CourseEditComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id/delete', component: CourseDeleteComponent, canActivate: [AuthGuard] },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'instructors/create', component: InstructorCreateComponent, canActivate: [AuthGuard] },
  { path: 'instructors/:id', component: InstructorDetailComponent },
  { path: 'instructors/:id/edit', component: InstructorEditComponent, canActivate: [AuthGuard] },
  { path: 'instructors/:id/delete', component: InstructorDeleteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
