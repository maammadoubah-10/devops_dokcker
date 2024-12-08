import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Array<{ id: number; name: string; email: string }> = [];

  constructor() { }

  getStudents() {
    return this.students;
  }

  addStudent(student: { id: number; name: string; email: string }) {
    this.students.push(student);
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(student => student.id !== id);
  }
  updateStudent(updatedStudent: any) {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }
}
