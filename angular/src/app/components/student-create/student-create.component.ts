import { Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { JsonObject } from './../../models/json-object';
import { Component, OnInit } from '@angular/core';
import { Student, Attributes } from './../../models/student';
import axios from 'axios';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  student: Student;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
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
      const postObject = new JsonObject;
      this.student = new Student;
      this.student.attributes = new Attributes;
      this.student.attributes.name = name.value;
      this.student.attributes.field_first_name_student = firstname.value;
      postObject.data = this.student;
      console.log(postObject);
      const jsonResponse = await this.studentService.postStudent<JsonObject>(postObject);
      console.log(jsonResponse);
      this.router.navigate([`students/${jsonResponse.data.id}`]);
    } catch ( error ) {
      console.error( error );
    }
  }
}
