import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Student } from 'src/app/models/student';
import { JsonObject } from './../../models/json-object';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  public student: Student;
  public courses: Course[];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getStudent();
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
}
