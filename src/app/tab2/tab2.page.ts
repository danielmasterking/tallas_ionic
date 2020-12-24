import { Component } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cedula:string;
  talla:string;
  constructor(
    private personaService: PersonaService,
    private router: Router, 
    private actRoute: ActivatedRoute,
    private alertController: AlertController,
  ) {}

  guardar() {
    if(this.cedula == ''){
      this.presentAlert('Cedula es obligatoria');
    }else if(this.talla == ''){
      this.presentAlert('talla es obligatoria');
    }else{
      let body = {
        "cedula":this.cedula,
        "talla":this.talla
      };
      this.personaService.crearRegistro(body).subscribe(result => { 
        console.log(result)
        if(result['code'] == '200') {
          this.presentAlert(result['mensaje']);
          this.router.navigate(['/tabs/tab1'])
        } 
        
        if(result['code'] == '500') {
          this.presentAlert(result['mensaje']);
        }      
      });
    }
    
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
