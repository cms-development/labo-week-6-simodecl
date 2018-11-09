import { Component, OnInit } from '@angular/core';
import { InstructorService } from './../../services/instructor.service';
import { Instructor } from 'src/app/models/instructor';
import { JsonObject } from './../../models/json-object';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  public instructors: Instructor[];

  constructor(private instructorService: InstructorService) { }

  ngOnInit() {
    this.getInstructors();
  }

  public async getInstructors(): Promise<void> {

    try {

        const jsonResponse = await this.instructorService.getInstructors<JsonObject>();
        this.instructors = jsonResponse.data;
        console.log(this.instructors);

    } catch ( error ) {

        console.error( error );

    }
  }
}
