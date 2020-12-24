import { Component } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personas;
  constructor(
    private personaService: PersonaService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ionViewDidEnter(){
    this.obtenerRegistros();
  }

  obtenerRegistros() {
    this.personaService.obtenerRegistros()
    .subscribe(result =>{
      this.personas = result;
      console.log(this.personas)
    } );
  }

  actualizar(id){
    
    this.router.navigate(['/actualizar/'+id])
    
  }

  eliminar(id) {
    this.personaService.eliminar(id).subscribe(result =>{
      
      this.presentAlert(result['mensaje'])
      this.obtenerRegistros()
    } );
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
