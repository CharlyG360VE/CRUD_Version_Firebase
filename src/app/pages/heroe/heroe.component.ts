import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  nombreHeroe: string;

  constructor( private heroeService: HeroesService,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');

    if(ID !== 'nuevo'){
      this.heroeService.getHeroe(ID)
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = ID;
          this.nombreHeroe = resp.nombre;
        } )
    }

    if( ID === 'nuevo' ){
      this.nombreHeroe = ID;
    }

  }

  guardar( form: NgForm){

    let peticion: Observable<any>;

    if( form.invalid ){
      console.log('Formulario no valido')
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    if(this.heroe.id){

      peticion = this.heroeService.actualizarHeroe( this.heroe );
  
    } else {

      peticion = this.heroeService.crearHeroe( this.heroe );

    }

    peticion.subscribe( resp => {
      console.log( resp )

      Swal.fire({
        title: ` El heroe ${this.heroe.nombre}`,
        text: 'Se actualizo correctamente',
        icon: 'success',
        allowOutsideClick: false
      })
      Swal.showLoading();
      Swal.close()


    } )

  }

}
