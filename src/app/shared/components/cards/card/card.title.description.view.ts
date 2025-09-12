import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { DatePipe } from '@angular/common';

export interface ICardTitleDescription {
  id: string;
  title: string;
  date: string | null;
}

@Component({
  selector: 'app-card-title-description-view',
  templateUrl: 'card.title.description.view.html',
  styleUrls: ['card.title.description.view.scss'],
  standalone: true,
  imports: [IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonLabel, DatePipe],

})
export class CardTitleDescriptionViewComponent {

  @Output() action = new EventEmitter<string | undefined>();
  @Output() delete = new EventEmitter<string | undefined>();
  @Input() content?: ICardTitleDescription;

  constructor() {
    addIcons({ trash });
  }

  deleteInternal = () => {
    this.delete.emit(this.content?.id)
  }
}
