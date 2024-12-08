import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

declare var bootstrap: any;

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Array<{ id: number; name: string; email: string }> = [];
  newStudent = { id: 0, name: '', email: '' };
  editStudent = { id: 0, name: '', email: '' };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  openAddModal() {
    const modalElement = document.getElementById('addStudentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addStudent() {
    this.newStudent.id = this.students.length + 1;
    this.studentService.addStudent(this.newStudent);
    this.students = this.studentService.getStudents(); // Refresh the list
    this.newStudent = { id: 0, name: '', email: '' };
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents(); // Refresh the list
  }

  openEditModal(student: { id: number; name: string; email: string }) {
    // Ouvrir le modal pour modifier l'étudiant
    this.editStudent = { ...student }; // Initialiser editStudent avec les données de l'étudiant à modifier

    const modalElement = document.getElementById('editStudentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  updateStudent() {
    // Vérifiez si editStudent a un id valide avant de procéder à la mise à jour
    if (this.editStudent && this.editStudent.id > 0) {
      // Appeler la méthode updateStudent du service avec editStudent comme paramètre
      this.studentService.updateStudent(this.editStudent);
  
      // Réinitialiser editStudent après la mise à jour
      this.editStudent = { id: 0, name: '', email: '' };
  
      // Fermer le modal
      const modalElement = document.getElementById('editStudentModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.hide(); // Fermer le modal
      }
    } else {
      console.error('L\'étudiant à mettre à jour est invalide ou n\'a pas d\'id valide.');
    }
  }
  

  

}










