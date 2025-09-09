import { Component, Input } from '@angular/core';

import INetwork from '@network/network.interface';



@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name?: string;

  network?: INetwork;
}
