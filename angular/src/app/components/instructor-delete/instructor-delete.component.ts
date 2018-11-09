import { Location } from '@angular/common';
import { JsonObject } from './../../models/json-object';
import { InstructorService } from './../../services/instructor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-instructor-delete',
  templateUrl: './instructor-delete.component.html',
  styleUrls: ['./instructor-delete.component.css']
})
export class InstructorDeleteComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private instructorService: InstructorService,
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

  public async deleteInstructor(): Promise<void> {

    try {
      const id = this.id;
      const jsonResponse = await this.instructorService.deleteInstructor<JsonObject>(id);
      console.log(jsonResponse);
      this.router.navigate(['instructors']);
    } catch ( error ) {
      console.error( error );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
