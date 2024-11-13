import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { Ejemplo1Component } from "./formulario/ejemplo1/ejemplo1.component";
// import { ZodiacoComponent } from "./formulario/zodiaco/zodiaco.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NgStyle,
    // , Ejemplo1Component
    // , ZodiacoComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
