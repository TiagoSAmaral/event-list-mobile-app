import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonText, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import futureDateValidator from '@shared/logic/future.date.validator';
import {NETWORK_REQUEST} from "@shared/interfaces/network.request.interface";
import IResponseDefault from "@shared/interfaces/response.default";
import ApiRequiriments from "@network/api.requiriments";
import { ToastController } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { refresh } from 'ionicons/icons';

@Component({
  selector: 'app-create.events.page',
  templateUrl: 'create.events.page.html',
  styleUrls: ['create.events.page.scss'],
  standalone: true,
  imports: [IonButtons, IonText, CommonModule, IonInput,
    IonItem, IonHeader, IonToolbar, IonTitle,
    IonContent, ReactiveFormsModule, IonButton, IonIcon]
})
export class CreateEventsPage {

  title = pageIdentifier["listEventPage"].title;
  eventForm!: FormGroup;
  maxTitleSize = 30;
  minSize = 3;
  maxDescriptionSize = 500;
  maxSizeLocation = 200;

  private networkRequest = inject(NETWORK_REQUEST);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({refresh});
    this.createNewForm();
  }

  ionViewDidEnter() {
    this.createNewForm();
  }

  createNewForm = () => {

    // Conserva estado caso usuário já tenha feito alguma alteracao no formulário.
    if (this.eventForm != undefined && this.eventForm?.dirty) {
      return;
    }

    this.eventForm = this.makeFom();
  }

  makeFom = (): FormGroup => {
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(this.maxTitleSize), Validators.minLength(this.minSize)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(this.maxDescriptionSize), Validators.minLength(this.minSize)]),
      date: new FormControl('', [Validators.required, futureDateValidator]),
      locale: new FormControl('', [Validators.required, Validators.maxLength(this.maxSizeLocation), Validators.minLength(this.minSize)])
    });
  }

  saveForm = () => {
    if (this.eventForm.invalid) {

      return;
    }

    this.networkRequest.request<IResponseDefault<any>>(ApiRequiriments.createEvent(this.eventForm.value)).subscribe(async response => {
      
      const toast = await this.toastController.create({
        message: response.message,
        duration: 5000,
        position: 'bottom',
        color: response.status == 200 ? 'primary': 'warning',
        buttons: [ { text: 'Fechar', role: 'cancel', handler: () => {} } ]
      });

      await toast.present();
      this.eventForm = this.makeFom();
    });
  }

  resetForm = () => {
    this.eventForm = this.makeFom();
  }
}

