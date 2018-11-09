import { Course } from 'src/app/models/course';
import { CourseService } from './../../services/course.service';
import { Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { JsonObject } from './../../models/json-object';
import { Component, OnInit } from '@angular/core';
import { Student, Attributes, Relationships, FieldCoursesData, FieldCourses } from './../../models/student';
import axios from 'axios';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  student: Student;
  courses: Course[];
  checkboxes = [];
  selectedCourses = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private courseService: CourseService,
    ) {}

  ngOnInit() {
    this.getCourses();

    axios.interceptors.request.use(function(config) {
      const token = localStorage.getItem('access_token');
      if ( token != null ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, function(err) {
      return Promise.reject(err);
    });
  }

  public async postStudent(name, firstname): Promise<void> {
    try {
      // Checkboxes
      const selectedIds = this.checkboxes.filter((ch) => ch.selected).map((ch) =>  ch.value);
      selectedIds.forEach(course => {
        this.selectedCourses.push({
          type: 'course--course',
          id: course
        });
      });
      console.log(this.selectedCourses);

      // Data for request
      const postObject = new JsonObject;
      this.student = new Student;
      this.student.attributes = new Attributes;
      this.student.attributes.name = name.value;
      this.student.attributes.field_first_name_student = firstname.value;
      this.student.relationships = new Relationships();
      this.student.relationships.field_courses = new FieldCoursesData();
      this.student.relationships.field_courses.data = this.selectedCourses;
      postObject.data = this.student;
      console.log(postObject);
      const jsonResponse = await this.studentService.postStudent<JsonObject>(postObject);
      console.log(jsonResponse);
      this.router.navigate([`students/${jsonResponse.data.id}`]);
    } catch ( error ) {
      console.error( error );
    }
  }

  public async getCourses(): Promise<void> {
    try {
        const jsonResponse = await this.courseService.getCourses<JsonObject>();
        this.courses = jsonResponse.data;
        console.log(this.courses);
        this.courses.forEach(course => {
          this.checkboxes.push({
            name: course.attributes.name,
            value: course.id,
            selected: false
          });
        });
    } catch ( error ) {
        console.error( error );
    }
  }
}
