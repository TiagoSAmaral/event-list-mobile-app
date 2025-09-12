import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonSpinner, IonItem, IonBackButton, IonButtons, IonLabel, IonButton } from '@ionic/angular/standalone';
import EventModel from '@shared/interfaces/event.model';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';
import { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import IResponseDefault from '@shared/interfaces/response.default';
import ApiRequiriments from '@shared/services/network/api.requiriments';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail.event.page',
  templateUrl: 'detail.event.page.html',
  styleUrls: ['detail.event.page.scss'],
    standalone: true,
  imports: [IonSpinner, IonItem, IonList, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, AsyncPipe, DatePipe, IonLabel, IonButton],
})
export class DetailEventPage {

  title = pageIdentifier["eventDetailPage"].title;
  currentEventId?: string | null;
  obsContent$?: Observable<IResponseDefault<EventModel | undefined>>;
  private networkRequest = inject(NETWORK_REQUEST);
  private actRouter = inject(ActivatedRoute);
  private toastController = inject(ToastController);
  private navigation = inject(NavController);

  constructor() {
    this.currentEventId = this.actRouter.snapshot.paramMap.get('id');
  }

  ionViewDidEnter() {
    this.requestPageContent(this.currentEventId);
  }

  requestPageContent = (id: string | undefined | null) => {

    if (id == null || id == undefined)
      return;

    this.obsContent$ = this.networkRequest.request<IResponseDefault<EventModel | undefined>>(ApiRequiriments.detailEvent(id));
    this.networkRequest.request<IResponseDefault<EventModel | undefined>>(ApiRequiriments.detailEvent(id)).subscribe(item => {
      console.log(item);
    });
  }

  deleteEvent = (id: string | undefined | null) => {

      if (id == undefined && id == null && (id ?? '') == '')
        return;

      this.networkRequest.request<IResponseDefault<undefined>>(ApiRequiriments.deleteEvent(id!)).subscribe(async response => {

        const toast = await this.toastController.create({
          message: response.message,
          duration: 5000,
          position: 'bottom',
          color: response.status == 200 ? 'primary': 'warning',
          buttons: [ { text: 'Fechar', role: 'cancel', handler: () => {} } ]
        });

        toast.present();
        this.navigation.back();
      });

    }
}
