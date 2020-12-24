import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  cedula:string;
  talla:string;
  id:number;
  constructor(
    private personaService: PersonaService,
    private router: Router, 
    private actRoute: ActivatedRoute,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.obtenerRegistro();
  }
  obtenerRegistro() {
    this.actRoute.params.subscribe((data: any) => {
      this.personaService.obtenerRegistro(data.id).subscribe(result =>{
        this.cedula = result['cedula'];
        this.talla = result['talla'];
        this.id = result['id'];
        
      } );
    });
  }

  actualizar() {
    
    if(this.cedula == ''){
      this.presentAlert('Cedula es obligatoria');
    }else if(this.talla == ''){
      this.presentAlert('talla es obligatoria');
    }else{
      let body = {
        "id":this.id,
        "cedula":this.cedula,
        "talla":this.talla
      };
      this.personaService.actualizarRegistro(body).subscribe(result => { 
        console.log(result)
        
        this.presentAlert(result['mensaje']);
        this.router.navigate(['/tabs/tab1']);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      });
    }
  }

  cancelar() {
    this.router.navigate(['/tabs/tab1'])
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }
}
