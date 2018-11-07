import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';

import { CoursesComponent } from '../../components/courses/courses.component';
import { CourseDetailComponent } from '../../components/course-detail/course-detail.component';

import { InstructorsComponent } from './../../components/instructors/instructors.component';
import { InstructorDetailComponent } from './../../components/instructor-detail/instructor-detail.component';

import { StudentDetailComponent } from './../../components/student-detail/student-detail.component';
import { StudentsComponent } from './../../components/students/students.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'instructors/:id', component: InstructorDetailComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
