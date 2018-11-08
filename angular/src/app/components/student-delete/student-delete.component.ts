import { Location } from '@angular/common';
import { JsonObject } from './../../models/json-object';
import { StudentService } from './../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private studentService: StudentService,
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

  public async deleteStudent(): Promise<void> {

    try {
      const id = this.id;
      const jsonResponse = await this.studentService.deleteStudent<JsonObject>(id);
      console.log(jsonResponse);
      this.router.navigate(['students']);
    } catch ( error ) {
      console.error( error );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
