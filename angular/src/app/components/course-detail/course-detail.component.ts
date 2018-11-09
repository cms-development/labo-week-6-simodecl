import { Instructor } from './../../models/instructor';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { Course } from 'src/app/models/course';
import { JsonObject } from './../../models/json-object';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  public course: Course;
  public students: Student[] = [];
  public instructor: Instructor;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getCourse();
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

  goEdit(): void {
    this.router.navigate([`${this.router.url}/edit`]);
  }

  goDelete(): void {
    this.router.navigate([`${this.router.url}/delete`]);
  }
}
