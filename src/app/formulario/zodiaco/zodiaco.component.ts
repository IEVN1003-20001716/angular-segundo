import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';


@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})
export default class ZodiacoComponent {
  zodiacForm: FormGroup;
  verResultados: boolean = false;
  edad: number = 0;
  signoZodiacal: string = '';
  imagenSigno: string = '';

  constructor(private fb: FormBuilder) {
    this.zodiacForm = this.fb.group({
      nombre: ['', Validators.required],
      Apaterno: ['', Validators.required],
      Amaterno: ['', Validators.required],
      Dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      Mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      Año: ['', [Validators.required, Validators.min(1900)]],
      sexo: ['', Validators.required]
    });
  }

  calcularEdad() {
    const dia = this.zodiacForm.value.Dia;
    const mes = this.zodiacForm.value.Mes - 1; 
    const año = this.zodiacForm.value.Año;

    const fechaNacimiento = new Date(año, mes, dia);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesDiferencia = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (mesDiferencia < 0 || (mesDiferencia === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    this.edad = edad;
  }

  obtenerSignoZodiacal() {
    const dia = this.zodiacForm.value.Dia;
    const mes = this.zodiacForm.value.Mes;

    if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 19)) {
      this.signoZodiacal = 'Aries';
      this.imagenSigno = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ91uLMlIcEZY4pIWq1GIJXWdQoHkIOjhs2Zw&s';
    } else if ((mes == 4 && dia >= 20) || (mes == 5 && dia <= 20)) {
      this.signoZodiacal = 'Tauro';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg';
    } else if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) {
      this.signoZodiacal = 'Géminis';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg';
    } else if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) {
      this.signoZodiacal = 'Cáncer';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg';
    } else if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) {
      this.signoZodiacal = 'Leo';
      this.imagenSigno = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36Cr-dEF7FIwGIw75wLfOweuMcIJSKMahSA&s';
    } else if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) {
      this.signoZodiacal = 'Virgo';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg';
    } else if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) {
      this.signoZodiacal = 'Libra';
      this.imagenSigno = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Mono-768x657-1.jpg';
    } else if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) {
      this.signoZodiacal = 'Escorpio';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg';
    } else if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) {
      this.signoZodiacal = 'Sagitario';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg';
    } else if ((mes == 12 && dia >= 22) || (mes == 1 && dia <= 19)) {
      this.signoZodiacal = 'Capricornio';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg';
    } else if ((mes == 1 && dia >= 20) || (mes == 2 && dia <= 18)) {
      this.signoZodiacal = 'Acuario';
      this.imagenSigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg';
    } else if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) {
      this.signoZodiacal = 'Piscis';
      this.imagenSigno = 'assets/imagenes/piscis.png';
    } else {
      this.signoZodiacal = 'Desconocido';
      this.imagenSigno = '';
    }
  }

  imprimir() {
    if (this.zodiacForm.valid) {
      this.calcularEdad();
      this.obtenerSignoZodiacal();
      this.verResultados = true;
    }
  }
}