export class Student {
  id: number;
  type = 'student--student';
  attributes: Attributes;
  relationships: Relationships;
}

export class Attributes {
  name: string;
  field_first_name_student: string;
}

export class Relationships {
  field_courses: FieldCoursesData;
}

export class FieldCoursesData {
  data: FieldCourses[];
}

export class FieldCourses {
  type = 'course--course';
  id: string;
}
