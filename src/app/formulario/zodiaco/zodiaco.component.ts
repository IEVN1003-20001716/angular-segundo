import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
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
    const año = this.zodiacForm.value.Año;
    const signos = [
      { nombre: 'Rata', años: [2020, 2008, 1996, 1984, 1972, 1960] },
      { nombre: 'Buey', años: [2021, 2009, 1997, 1985, 1973, 1961] },
      { nombre: 'Tigre', años: [2022, 2010, 1998, 1986, 1974, 1962] },
      { nombre: 'Conejo', años: [2023, 2011, 1999, 1987, 1975, 1963] },
      { nombre: 'Dragón', años: [2024, 2012, 2000, 1988, 1976, 1964] },
      { nombre: 'Serpiente', años: [2025, 2013, 2001, 1989, 1977, 1965] },
      { nombre: 'Caballo', años: [2026, 2014, 2002, 1990, 1978, 1966] },
      { nombre: 'Cabra', años: [2027, 2015, 2003, 1991, 1979, 1967] },
      { nombre: 'Mono', años: [2028, 2016, 2004, 1992, 1980, 1968] },
      { nombre: 'Gallo', años: [2029, 2017, 2005, 1993, 1981, 1969] }
    ];

    const signo = signos.find(s => s.años.includes(año));
    if (signo) {
      this.signoZodiacal = signo.nombre;
      this.imagenSigno = this.obtenerImagenPorSigno(signo.nombre);
    } else {
      this.signoZodiacal = 'Desconocido';
      this.imagenSigno = '';
    }
  }

  obtenerImagenPorSigno(signo: string): string {
    const imagenes: { [key: string]: string } = {
      'Rata': 'https://fumigasin.com/wp-content/uploads/2024/06/01-rat-friends-nationalgeographic_1162144.jpg',
      'Buey': 'https://peopleenespanol.com/thmb/ia0u33jxk7_bfFTLf1viDW9j5LA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/horoscopo-chino-buey-de-metal-2021-e93c7ebe89ab4c0daa8704d6e4a827dd.png',
      'Tigre': 'https://media.gettyimages.com/id/1346341844/es/vector/a%C3%B1o-nuevo-tiger-paperart.jpg?s=612x612&w=gi&k=20&c=WHQuCOtwXa4hoByeS-Zp9jGS7KxdvvN79-LC31KsL9Y=',
      'Conejo': 'https://www.clarin.com/2023/09/23/TSN1Cvpys_360x240__1.jpg',
      'Dragón': 'https://img.freepik.com/fotos-premium/dragon-chino-sobre-fondo-blanco-hecho-inteligencia-artificial-ai_41969-12099.jpg?w=360',
      'Serpiente': 'https://media.istockphoto.com/id/165930223/es/vector/a%C3%B1o-de-la-serpiente.jpg?s=612x612&w=0&k=20&c=KPbx-vCkDwNB1JCMkGDze2VG_TGLXit4M_u8JAQqOok=',
      'Caballo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg',
      'Cabra': 'https://www.clarin.com/2023/09/23/lBvOi_7yy_2000x1500__1.jpg',
      'Mono': 'https://img.asmedia.epimg.net/resizer/v2/AYM47ANZSFGRBAE74BKVN4MDIM.jpg?auth=810dc6e8204f93610ba8c1daece7633adac5046a53d21f92c65819da84d87e6b&width=1472&height=828&smart=true',
      'Gallo': 'https://i.ytimg.com/vi/oPt7fHX0UOk/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCrGHEaPOdmlp8fit-Ws10X8eoAIQ'
    };
    return imagenes[signo] || '';
  }

  imprimir() {
    if (this.zodiacForm.valid) {
      this.calcularEdad();
      this.obtenerSignoZodiacal();
      this.verResultados = true;
    }
  }
}
