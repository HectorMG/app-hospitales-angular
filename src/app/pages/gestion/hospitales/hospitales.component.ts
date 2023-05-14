import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/Hospital.model';
import { HospitalesService } from 'src/app/services/hospitales.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[];
  public total: number = 0;
  public desde: number = 0;

  constructor(private hospitalesService: HospitalesService){}

  ngOnInit(): void {
    this.obtenerHospitales();
  }

  obtenerHospitales(){
    this.hospitalesService.obtenerHospitales(this.desde).subscribe(
      ({hospitales, total}) => {
        this.total = total
        this.hospitales = hospitales;
      }
    );
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }else if(this.desde > this.total){
      this.desde -= valor;
    }  
    this.obtenerHospitales()
  }

}
