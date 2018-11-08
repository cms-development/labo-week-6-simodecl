import { StudentDeleteComponent } from './../../components/student-delete/student-delete.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';

import { CoursesComponent } from '../../components/courses/courses.component';
import { CourseDetailComponent } from '../../components/course-detail/course-detail.component';

import { InstructorsComponent } from './../../components/instructors/instructors.component';
import { InstructorDetailComponent } from './../../components/instructor-detail/instructor-detail.component';

import { StudentsComponent } from './../../components/students/students.component';
import { StudentDetailComponent } from './../../components/student-detail/student-detail.component';
import { StudentEditComponent } from './../../components/student-edit/student-edit.component';
import { StudentCreateComponent } from './../../components/student-create/student-create.component';

import { AuthGuardService as AuthGuard } from './../../services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'instructors/:id', component: InstructorDetailComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/create', component: StudentCreateComponent, canActivate: [AuthGuard] },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'students/:id/edit', component: StudentEditComponent, canActivate: [AuthGuard] },
  { path: 'students/:id/delete', component: StudentDeleteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
