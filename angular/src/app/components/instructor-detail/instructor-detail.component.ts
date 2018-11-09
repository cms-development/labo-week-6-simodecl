import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from './../../services/instructor.service';
import { Instructor } from 'src/app/models/instructor';
import { JsonObject } from './../../models/json-object';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit {

  public instructor: Instructor;

  constructor(
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getInstructor();
  }

  public async getInstructor(): Promise<void> {

    try {
      const id = this.route.snapshot.paramMap.get('id');
      const jsonResponse = await this.instructorService.getInstructor<JsonObject>(id);
      this.instructor = jsonResponse.data;
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
