export class Course {
  id: string;
  type = 'course--course';
  attributes: Attributes;
  relationships: Relationships;
}

export class Attributes {
  name: string;
  field_academic_institution: string;
}

export class Relationships {
  field_students: FieldStudentsData;
  field_instructor: FieldInstructorData;
}

export class FieldStudentsData {
  data: FieldStudent[];
}

export class FieldInstructorData {
  data: FieldInstructor;
}

export class FieldStudent {
  type = 'student--student';
  id: string;
}
export class FieldInstructor {
  type = 'instructor--instructor';
  id: string;
}
