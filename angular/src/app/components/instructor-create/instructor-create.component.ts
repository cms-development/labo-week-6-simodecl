import { Course } from 'src/app/models/course';
import { CourseService } from './../../services/course.service';
import { Router } from '@angular/router';
import { InstructorService } from './../../services/instructor.service';
import { JsonObject } from './../../models/json-object';
import { Component, OnInit } from '@angular/core';
import { Instructor, Attributes } from './../../models/instructor';
import axios from 'axios';

@Component({
  selector: 'app-instructor-create',
  templateUrl: './instructor-create.component.html',
  styleUrls: ['./instructor-create.component.css']
})
export class InstructorCreateComponent implements OnInit {
  instructor: Instructor;

  constructor(
    private instructorService: InstructorService,
    private router: Router
    ) {}

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

  public async postInstructor(name, firstname, rank, title): Promise<void> {
    try {
      // Data for request
      const postObject = new JsonObject;
      this.instructor = new Instructor;
      this.instructor.attributes = new Attributes;
      this.instructor.attributes.name = name.value;
      this.instructor.attributes.field_first_name = firstname.value;
      this.instructor.attributes.field_academic_rank = rank.value;
      this.instructor.attributes.field_academic_title = title.value;
      postObject.data = this.instructor;
      console.log(postObject);
      const jsonResponse = await this.instructorService.postInstructor<JsonObject>(postObject);
      console.log(jsonResponse);
      this.router.navigate([`instructors/${jsonResponse.data.id}`]);
    } catch ( error ) {
      console.error( error );
    }
  }
}
