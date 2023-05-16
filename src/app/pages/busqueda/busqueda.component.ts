import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/Hospital.model';
import { Medico } from 'src/app/models/Medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(private activatedRouter: ActivatedRoute, private busquedaService: BusquedasService){}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      ({termino}) => this.busquedaGeneral(termino)
    );
  }

  busquedaGeneral(termino: string){
    this.busquedaService.busquedaGeneral(termino).subscribe(
      (resp:{ usuarios:Usuario[], hospitales: Hospital[], medicos: Medico[] }) => {
        this.usuarios = resp.usuarios,
        this. hospitales = resp.hospitales,
        this.medicos = resp.medicos;
      }
    );
  }



}
