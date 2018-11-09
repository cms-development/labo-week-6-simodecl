import { Location } from '@angular/common';
import { JsonObject } from './../../models/json-object';
import { CourseService } from './../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
    ) { }

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

  public async deleteCourse(): Promise<void> {

    try {
      const id = this.id;
      const jsonResponse = await this.courseService.deleteCourse<JsonObject>(id);
      console.log(jsonResponse);
      this.router.navigate(['courses']);
    } catch ( error ) {
      console.error( error );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
