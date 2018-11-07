import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { InstructorDetailComponent } from './components/instructor-detail/instructor-detail.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
