import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateEventsPage } from './create.events.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular/standalone';
import { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateEventsPage', () => {
  let component: CreateEventsPage;
  let fixture: ComponentFixture<CreateEventsPage>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let networkRequestSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    
    const mockToastElement = {
      present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
      dismiss: jasmine.createSpy('dismiss'),
      onDidDismiss: jasmine.createSpy('onDidDismiss'),
      onWillDismiss: jasmine.createSpy('onWillDismiss'),
      // Propriedades básicas para satisfazer a interface
      animated: true,
      duration: 5000,
      position: 'bottom',
      color: 'primary'
    } as any; // Usar any para evitar problemas com todas as propriedades

    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
    const networkSpy = jasmine.createSpyObj('NETWORK_REQUEST', ['request']);

    // Configurar o spy para retornar o mock do toast
    toastSpy.create.and.returnValue(Promise.resolve(mockToastElement));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, IonicModule, HttpClientTestingModule],
      providers: [
        { provide: ToastController, useValue: toastSpy },
        { provide: NETWORK_REQUEST, useValue: networkSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEventsPage);
    component = fixture.componentInstance;
    
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    networkRequestSpy = TestBed.inject(NETWORK_REQUEST) as jasmine.SpyObj<any>;
    
    fixture.detectChanges();
  });

  // Teste 1: Criação do componente
  it('deve criar o componente corretamente', () => {
    expect(component).toBeTruthy();
  });

  // Teste 2: Inicialização do formulário
  it('deve inicializar o formulário com campos vazios e váladores', () => {
    expect(component.eventForm).toBeDefined();
    expect(component.eventForm.get('title')).toBeTruthy();
    expect(component.eventForm.get('description')).toBeTruthy();
    expect(component.eventForm.get('date')).toBeTruthy();
    expect(component.eventForm.get('locale')).toBeTruthy();
  });

  // Teste 3: Validação de formulário inválido
  it('não deve enviar formulário quando inválido', () => {
    component.eventForm.setValue({
      title: 'AB', // Muito curto
      description: 'Desc', // Válido
      date: '', // Inválido
      locale: '' // Inválido
    });

    component.saveForm();

    expect(networkRequestSpy.request).not.toHaveBeenCalled();
  });

  // Teste 4: Envio bem-sucedido do formulário
  it('deve enviar formulário válido e resetar após sucesso', fakeAsync(() => {
    const mockResponse = {
      status: 200,
      message: 'Evento criado com sucesso'
    };

    networkRequestSpy.request.and.returnValue(of(mockResponse));

    // Preenche formulário válido
    component.eventForm.setValue({
      title: 'Evento Teste',
      description: 'Descrição do evento teste',
      date: '2025-09-13T00:00:00',
      locale: 'Local do evento'
    });

    expect(component.eventForm.valid).toBeTrue();
    component.saveForm();
    tick();
    fixture.whenStable();

    expect(networkRequestSpy.request).toHaveBeenCalled();
    expect(toastControllerSpy.create).toHaveBeenCalled();
  }));

  // Teste 5: Reset do formulário
  it('deve resetar o formulário quando chamado', () => {
    // Preenche formulário
    component.eventForm.setValue({
      title: 'Evento Teste',
      description: 'Descrição',
      date: '2024-12-31',
      locale: 'Local'
    });

    const initialFormValue = component.eventForm.value;
    component.resetForm();

    expect(component.eventForm.value).not.toEqual(initialFormValue);
    expect(component.eventForm.pristine).toBe(true);
  });

  // Teste 6: Preservação de formulário sujo
  it('deve preservar formulário sujo ao criar novo', () => {
    // Preenche e marca como sujo
    component.eventForm.setValue({
      title: 'Evento Existente',
      description: 'Descrição existente',
      date: '2024-12-31',
      locale: 'Local existente'
    });
    component.eventForm.markAsDirty();

    const formBeforeCreate = component.eventForm;
    component.createNewForm();

    expect(component.eventForm).toBe(formBeforeCreate);
  });

  // Teste 7: Criação de novo formulário quando limpo
  it('deve criar novo formulário quando o atual estiver limpo', () => {
    const formBeforeCreate = component.eventForm;
    component.createNewForm();

    expect(component.eventForm).not.toBe(formBeforeCreate);
  });
});