import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course';
import { JsonObject } from './../../models/json-object';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Student, FieldCoursesData, Relationships, Attributes } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: Student;
  courses: Course[];
  checkboxes = [];
  selectedCourses = [];
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getStudent();
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

  public async getStudent(): Promise<void> {

    try {
      const jsonResponse = await this.studentService.getStudent<JsonObject>(this.id);
      this.student = jsonResponse.data;
      jsonResponse.included ? this.courses = jsonResponse.included : console.log('No courses found');
      console.log(jsonResponse);
    } catch ( error ) {
      console.error( error );
    }
  }

  public async patchStudent(name, firstname): Promise<void> {

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
      const patchObject = new JsonObject;
      this.student = new Student;
      this.student.id = this.id;
      this.student.attributes = new Attributes;
      this.student.attributes.name = name.value;
      this.student.attributes.field_first_name_student = firstname.value;
      this.student.relationships = new Relationships();
      this.student.relationships.field_courses = new FieldCoursesData();
      this.student.relationships.field_courses.data = this.selectedCourses;
      patchObject.data = this.student;
      console.log(patchObject);
      const jsonResponse = await this.studentService.patchStudent<JsonObject>(this.id, patchObject);
      console.log(jsonResponse);
      this.router.navigate([`students/${this.student.id}`]);
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
