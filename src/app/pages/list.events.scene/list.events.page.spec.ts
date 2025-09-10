import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventsScenePage } from './list.events.page';

describe('ListEventsScenePage', () => {
  let component: ListEventsScenePage;
  let fixture: ComponentFixture<ListEventsScenePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListEventsScenePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
