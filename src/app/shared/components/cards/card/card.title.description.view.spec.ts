import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardTitleDescriptionViewComponent, ICardTitleDescription } from './card.title.description.view';
import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';

describe('CardTitleDescriptionViewComponent', () => {
  let component: CardTitleDescriptionViewComponent;
  let fixture: ComponentFixture<CardTitleDescriptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    //   declarations: [CardTitleDescriptionViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardTitleDescriptionViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deleteInternal deve emitir evento delete com ID correto', () => {
    const content: ICardTitleDescription = { id: '123', title: 'Teste', description: 'Descrição' };
    component.content = content;

    spyOn(component.delete, 'emit');

    component.deleteInternal();

    expect(component.delete.emit).toHaveBeenCalledWith('123');
  });

  it('deleteInternal deve emitir evento delete com undefined se content não definido', () => {
    component.content = undefined;

    spyOn(component.delete, 'emit');

    component.deleteInternal();

    expect(component.delete.emit).toHaveBeenCalledWith(undefined);
  });
});