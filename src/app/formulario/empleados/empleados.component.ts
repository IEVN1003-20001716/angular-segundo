import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styles: ``
})
export default class EmpleadosComponent {
  empleados: any[] = [];
  matricula = '';
  nombre = '';
  correo = '';
  edad = 0;
  horasTrabajadas = 0;
  editMode = false;
  empleadoEditIndex: number | null = null;
  mostrarTabla = false;

  constructor() {
    const storedEmpleados = localStorage.getItem('empleados');
    if (storedEmpleados) {
      this.empleados = JSON.parse(storedEmpleados);
    }
  }

  registrarEmpleado() {
    const empleadoExistente = this.empleados.find(emp => emp.matricula === this.matricula);
    
    // Verifica si la matrícula ya existe y no está en modo de edición
    if (!this.editMode && empleadoExistente) {
        alert('La matrícula ya existe.');
        return;
    }
    
    let horasNormales = 0;
    let horasExtras = 0;

    // Si las horas trabajadas son mayores a 40, separa las horas normales y extras
    if (this.horasTrabajadas > 40) {
      horasNormales = 40; // Las primeras 40 horas son normales
      horasExtras = this.horasTrabajadas - 40; // Horas extras son el excedente
    } else {
      horasNormales = this.horasTrabajadas; // Si son 40 o menos, todas son normales
      horasExtras = 0; // No hay horas extras
    }

    // Calcula el pago total: horas normales a 70 y horas extras a 140
    const pagoTotal = (horasNormales * 70) + (horasExtras * 140); // 70 por hora normal, 140 por hora extra
    
    // Crea el objeto empleado con todos los datos necesarios
    const empleado = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        horasExtras: horasExtras, // Muestra cuántas horas extras se trabajaron
        pagoTotal, // Total a pagar por todas las horas
        horasPorPagar: horasNormales * 70 // Total a pagar solo por horas trabajadas normales
    };

    // Maneja la edición de empleados
    if (this.editMode && this.empleadoEditIndex !== null) {
        this.empleados[this.empleadoEditIndex] = empleado;
        this.editMode = false;
        this.empleadoEditIndex = null;
    } else {
        this.empleados.push(empleado); // Agrega el nuevo empleado a la lista
    }

    // Guarda la lista actualizada en localStorage
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.limpiarFormulario(); // Limpia el formulario después de registrar
  }

  limpiarFormulario() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = 0;
    this.horasTrabajadas = 0;
    this.editMode = false;
    this.empleadoEditIndex = null;
  }

  modificarEmpleado() {
    const matriculaInput = prompt('Ingresa la matrícula del empleado a modificar:');
    const index = this.empleados.findIndex(emp => emp.matricula === matriculaInput);

    if (index !== -1) {
      const empleado = this.empleados[index];
      this.matricula = empleado.matricula;
      this.nombre = empleado.nombre;
      this.correo = empleado.correo;
      this.edad = empleado.edad;
      this.horasTrabajadas = empleado.horasTrabajadas; // Se mantiene la cantidad original de horas trabajadas
      this.editMode = true;
      this.empleadoEditIndex = index;
    } else {
      alert(`Empleado con matrícula ${matriculaInput} no encontrado.`);
    }
  }

  eliminarEmpleado() {
    const matriculaInput = prompt('Ingresa la matrícula del empleado a eliminar:');
    const index = this.empleados.findIndex(emp => emp.matricula === matriculaInput);

    if (index !== -1) {
      this.empleados.splice(index, 1);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
    } else {
      alert(`Empleado con matrícula ${matriculaInput} no encontrado.`);
    }
  }
  
  calcularTotalPagar() {
    return this.empleados.reduce((total, emp) => total + emp.pagoTotal, 0);
  }

  imprimirTabla() {
    this.mostrarTabla = true;
  }

  eliminarTodo() {
    if (confirm('Eliminar Todo?')) {
      this.empleados = []; 
      localStorage.removeItem('empleados');
      this.mostrarTabla = false;
      alert('Empleados Eliminados');
    }
  }
}
