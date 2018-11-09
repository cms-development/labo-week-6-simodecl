import { Instructor } from './../../models/instructor';
import { InstructorService } from './../../services/instructor.service';
import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { JsonObject } from './../../models/json-object';
import { Component, OnInit } from '@angular/core';
import { Course, Attributes, Relationships, FieldStudentsData, FieldInstructorData, FieldInstructor } from './../../models/course';
import axios from 'axios';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course: Course;
  students: Student[];
  checkboxes = [];
  selectedStudents = [];
  instructors: Instructor[];
  instructor: Instructor;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private instructorService: InstructorService
    ) {}

  ngOnInit() {
    this.getCourse();
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

  public async getCourse(): Promise<void> {

    try {
      const id = this.route.snapshot.paramMap.get('id');
      const jsonResponse = await this.courseService.getCourse<JsonObject>(id);
      this.course = jsonResponse.data;
      jsonResponse.included.forEach(el => {
        if (el.type === 'instructor--instructor') {
          this.instructor = el;
        } else if (el.type === 'student--student') {
          this.students.push(el);
        } else {
          console.log('No instructor or studens found');
        }
      });
      console.log(jsonResponse);
    } catch ( error ) {
      console.error( error );
    }
  }

  public async patchCourse(name, institution, instructor): Promise<void> {
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
      const patchObject = new JsonObject;
      this.course = new Course;
      this.course.id = this.id;
      this.course.attributes = new Attributes;
      this.course.attributes.name = name.value;
      this.course.attributes.field_academic_institution = institution.value;
      this.course.relationships = new Relationships;
      this.course.relationships.field_students = new FieldStudentsData;
      this.course.relationships.field_students.data = this.selectedStudents;
      this.course.relationships.field_instructor = new FieldInstructorData;
      this.course.relationships.field_instructor.data = new FieldInstructor;
      this.course.relationships.field_instructor.data.id = instructor.value;
      patchObject.data = this.course;
      console.log(patchObject);
      const jsonResponse = await this.courseService.patchCourse<JsonObject>(this.id, patchObject);
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
