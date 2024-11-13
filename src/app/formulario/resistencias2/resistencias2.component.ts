import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface Resistencia2 {
  color1: string;
  color2: string;
  color3: string;
  tolerance: number;
  value: number;
  max: number;
  min: number;
}

@Component({
  selector: 'app-resistencias2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resistencias2.component.html',
  styles: []
})
export default class Resistencias2Component {
  form: FormGroup;
  colors: string[] = [
    'Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo',
    'Verde', 'Azul', 'Morado', 'Gris', 'Blanco'
  ];
  results: Resistencia2[] = [];
  showResults: boolean = false; 

  colorValues: { [key: string]: number } = {
    Negro: 0, Café: 1, Rojo: 2, Naranja: 3,
    Amarillo: 4, Verde: 5, Azul: 6, Morado: 7,
    Gris: 8, Blanco: 9
  };
  multipliers: { [key: string]: number } = {
    Negro: 1, Café: 10, Rojo: 100, Naranja: 1000,
    Amarillo: 10000, Verde: 100000, Azul: 1000000,
    Morado: 10000000, Gris: 100000000, Blanco: 1000000000
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      tolerance: [5, Validators.required]
    });

    this.loadResults();
  }

  calculate() {
    const color1Value = this.colorValues[this.form.get('color1')?.value];
    const color2Value = this.colorValues[this.form.get('color2')?.value];
    const multiplier = this.multipliers[this.form.get('color3')?.value];
    const tolerance = this.form.get('tolerance')?.value;

    const resistenciaValor = ((color1Value * 10) + color2Value) * multiplier;
    const valorMax = resistenciaValor * (1 + tolerance / 100);
    const valorMin = resistenciaValor * (1 - tolerance / 100);

    const nuevaResistencia: Resistencia2 = {
      color1: this.form.get('color1')?.value,
      color2: this.form.get('color2')?.value,
      color3: this.form.get('color3')?.value,
      tolerance,
      value: resistenciaValor,
      max: valorMax,
      min: valorMin
    };

    this.results.push(nuevaResistencia);
    this.form.reset(); 

    this.saveResults();
  }

  // Método para mostrar resultados al imprimir todo
  printResults() {
    this.showResults = true; 
    console.log('Resultados almacenados:', this.results);
  }

  getColorStyle(color: string) {
    switch (color) {
      case 'Negro': return '#000000';
      case 'Café': return '#8B4513';
      case 'Rojo': return '#FF0000';
      case 'Naranja': return '#FFA500';
      case 'Amarillo': return '#FFFF00';
      case 'Verde': return '#008000';
      case 'Azul': return '#0000FF';
      case 'Morado': return '#800080';
      case 'Gris': return '#808080';
      case 'Blanco': return '#FFFFFF';
      default: return '#FFFFFF';
    }
  }

  saveResults() {
    localStorage.setItem('resistencias', JSON.stringify(this.results));
  }

  loadResults() {
    const savedResults = localStorage.getItem('resistencias');
    if (savedResults) {
      this.results = JSON.parse(savedResults);
    }
  }
}
