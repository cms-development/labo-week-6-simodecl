import { Instructor } from './../../models/instructor';
import { InstructorService } from './../../services/instructor.service';
import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { Router } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { JsonObject } from './../../models/json-object';
import { Component, OnInit } from '@angular/core';
import { Course, Attributes, Relationships, FieldStudentsData, FieldStudent, FieldInstructorData, FieldInstructor } from './../../models/course';
import axios from 'axios';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  course: Course;
  students: Student[];
  checkboxes = [];
  selectedStudents = [];
  instructors: Instructor[];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private studentService: StudentService,
    private instructorService: InstructorService
    ) {}

  ngOnInit() {
    this.getStudents();
    this.getInstuctors();

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

  public async postCourse(name, institution, instructor): Promise<void> {
    try {
      // Checkboxes
      const selectedIds = this.checkboxes.filter((ch) => ch.selected).map((ch) =>  ch.value);
      selectedIds.forEach(student => {
        this.selectedStudents.push({
          type: 'student--student',
          id: student
        });
      });
      console.log(this.selectedStudents);
      console.log(instructor);

      // Data for request
      const postObject = new JsonObject;
      this.course = new Course;
      this.course.attributes = new Attributes;
      this.course.attributes.name = name.value;
      this.course.attributes.field_academic_institution = institution.value;
      this.course.relationships = new Relationships;
      this.course.relationships.field_students = new FieldStudentsData;
      this.course.relationships.field_students.data = this.selectedStudents;
      this.course.relationships.field_instructor = new FieldInstructorData;
      this.course.relationships.field_instructor.data = new FieldInstructor;
      this.course.relationships.field_instructor.data.id = instructor.value;
      postObject.data = this.course;
      console.log(postObject);
      const jsonResponse = await this.courseService.postCourse<JsonObject>(postObject);
      console.log(jsonResponse);
      this.router.navigate([`courses/${jsonResponse.data.id}`]);
    } catch ( error ) {
      console.error( error );
    }
  }

  public async getStudents(): Promise<void> {
    try {
        const jsonResponse = await this.studentService.getStudents<JsonObject>();
        this.students = jsonResponse.data;
        console.log(this.students);
        this.students.forEach(student => {
          this.checkboxes.push({
            name: student.attributes.name,
            value: student.id,
            selected: false
          });
        });
    } catch ( error ) {
        console.error( error );
    }
  }

  public async getInstuctors(): Promise<void> {
    try {
        const jsonResponse = await this.instructorService.getInstructors<JsonObject>();
        this.instructors = jsonResponse.data;
        console.log(this.instructors);
    } catch ( error ) {
        console.error( error );
    }
  }
}
