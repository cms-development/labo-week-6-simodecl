import { Course } from './../../models/course';
import { JsonObject } from './../../models/json-object';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
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
  id: string;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getStudent();

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
      const id = this.route.snapshot.paramMap.get('id');
      const jsonResponse = await this.studentService.getStudent<JsonObject>(id);
      this.student = jsonResponse.data;
      jsonResponse.included ? this.courses = jsonResponse.included : console.log('No courses found');
      console.log(jsonResponse);
    } catch ( error ) {
      console.error( error );
    }
  }

  public async patchStudent(): Promise<void> {

    try {
      const patchObject = new JsonObject;
      patchObject.data = this.student;
      const jsonResponse = await this.studentService.patchStudent<JsonObject>(this.id, patchObject);
      console.log(jsonResponse);
      this.router.navigate([`students/${this.student.id}`]);
    } catch ( error ) {
      console.error( error );
    }
  }
}
