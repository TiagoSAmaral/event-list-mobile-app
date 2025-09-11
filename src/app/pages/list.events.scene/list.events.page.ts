import {Component, inject} from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonRefresher, RefresherCustomEvent, IonRefresherContent, IonSpinner } from '@ionic/angular/standalone';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';
import { CardTitleDescriptionViewComponent } from '@shared/components/cards/card/card.title.description.view';
import { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import EventModel from '@shared/components/models/event.model';
import ApiRequiriments from '@shared/services/network/api.requiriments';
import IResponseDefault from '@shared/interfaces/response.default';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DetailEventPage } from '@pages/detail.event.page/detail.event.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-events',
  templateUrl: 'list.events.page.html',
  styleUrls: ['list.events.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonRefresherContent, IonRefresher, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CardTitleDescriptionViewComponent, AsyncPipe, DatePipe],
})
export class ListEventsScenePage {

  title = pageIdentifier["listEventPage"].title;
  obsContent$?: Observable<IResponseDefault<EventModel[] | null | undefined >>;
 
  obsDelete$?: Observable<IResponseDefault<undefined>>;
  component = DetailEventPage;
  private toastController = inject(ToastController);
  private networkRequest = inject(NETWORK_REQUEST);
  private router = inject(Router);

  constructor() {}

  ionViewDidEnter() {
    this.requestPageContent();
  }

  openDescription = (id: string | undefined) => {
    this.router.navigate(['/tabs/tab1/detail', id]);
  }

  deleteEvent = (id: string | undefined) => {

    if (id == undefined) 
      return;
  
    this.networkRequest.request<IResponseDefault<undefined>>(ApiRequiriments.deleteEvent(id)).subscribe(async response => {

      const toast = await this.toastController.create({
        message: response.message,
        duration: 5000,
        position: 'bottom',
        color: response.status == 200 ? 'primary': 'warning',
        buttons: [ { text: 'Fechar', role: 'cancel', handler: () => {} } ]
      });

      toast.present();

      this.requestPageContent();
    });
    
  }

  requestPageContent = (event: RefresherCustomEvent | undefined = undefined) => {
    this.obsContent$ = this.networkRequest.request<IResponseDefault<EventModel[] | undefined>>(ApiRequiriments.listEvent());
    event?.target.complete();
  }
}
