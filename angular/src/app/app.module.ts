import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { InstructorDetailComponent } from './components/instructor-detail/instructor-detail.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentDeleteComponent } from './components/student-delete/student-delete.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { CourseDeleteComponent } from './components/course-delete/course-delete.component';
import { InstructorDeleteComponent } from './components/instructor-delete/instructor-delete.component';
import { InstructorCreateComponent } from './components/instructor-create/instructor-create.component';
import { InstructorEditComponent } from './components/instructor-edit/instructor-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    InstructorsComponent,
    InstructorDetailComponent,
    StudentsComponent,
    StudentDetailComponent,
    HomeComponent,
    StudentEditComponent,
    StudentCreateComponent,
    StudentDeleteComponent,
    CourseEditComponent,
    CourseCreateComponent,
    CourseDeleteComponent,
    InstructorDeleteComponent,
    InstructorCreateComponent,
    InstructorEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
