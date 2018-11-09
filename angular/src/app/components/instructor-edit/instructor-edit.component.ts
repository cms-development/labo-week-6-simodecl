import { JsonObject } from './../../models/json-object';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from './../../services/instructor.service';
import { Instructor, Attributes } from './../../models/instructor';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class InstructorEditComponent implements OnInit {
  instructor: Instructor;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInstructor();

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

  public async getInstructor(): Promise<void> {

    try {
      const jsonResponse = await this.instructorService.getInstructor<JsonObject>(this.id);
      this.instructor = jsonResponse.data;
      console.log(jsonResponse);
    } catch ( error ) {
      console.error( error );
    }
  }

  public async patchInstructor(name, firstname, rank, title): Promise<void> {

    try {
      // Data for request
      const patchObject = new JsonObject;
      this.instructor = new Instructor;
      this.instructor.id = this.id;
      this.instructor.attributes = new Attributes;
      this.instructor.attributes.name = name.value;
      this.instructor.attributes.field_first_name = firstname.value;
      this.instructor.attributes.field_academic_rank = rank.value;
      this.instructor.attributes.field_academic_title = title.value;
      patchObject.data = this.instructor;
      console.log(patchObject);
      const jsonResponse = await this.instructorService.patchInstructor<JsonObject>(this.id, patchObject);
      console.log(jsonResponse);
      this.router.navigate([`instructors/${this.instructor.id}`]);
    } catch ( error ) {
      console.error( error );
    }
  }
}
