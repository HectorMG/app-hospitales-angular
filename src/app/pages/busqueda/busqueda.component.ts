import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

  constructor(private activatedRouter: ActivatedRoute, private busquedaService: BusquedasService){}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      ({termino}) => this.busquedaGeneral(termino)
    );
  }

  busquedaGeneral(termino: string){
    this.busquedaService.busquedaGeneral(termino).subscribe(
      (resp) => console.log(resp)
    );
  }



}
