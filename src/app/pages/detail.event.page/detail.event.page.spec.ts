import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DetailEventPage } from './detail.event.page';
import { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

describe('DetailEventPage', () => {
  let component: DetailEventPage;
  let fixture: ComponentFixture<DetailEventPage>;
  let networkRequestSpy: jasmine.SpyObj<any>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {

    const navSpy = jasmine.createSpyObj('NavController', ['back']);
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
      providers: [
        { provide: NETWORK_REQUEST, useValue: networkSpy },
        { provide: ToastController, useValue: toastSpy },
        { provide: NavController, useValue: navSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEventPage);
    component = fixture.componentInstance;

    networkRequestSpy = TestBed.inject(NETWORK_REQUEST) as jasmine.SpyObj<any>;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    navControllerSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;

    fixture.detectChanges();
  });
    it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('ionViewDidEnter deve chamar requestPageContent', () => {
    spyOn(component, 'requestPageContent');
    component.ionViewDidEnter();
    expect(component.requestPageContent).toHaveBeenCalledWith('123');
  });

  it('requestPageContent deve chamar networkRequest.request com ID', () => {
    networkRequestSpy.request.and.returnValue(of({}));
    component.requestPageContent('123');
    expect(networkRequestSpy.request).toHaveBeenCalled();
  });

  it('requestPageContent não deve chamar networkRequest.request se ID for null', () => {
    component.requestPageContent(null);
    expect(networkRequestSpy.request).not.toHaveBeenCalled();
  });

  it('deleteEvent deve chamar request, criar toast e navegar para trás', fakeAsync(() => {
    const mockResponse = { status: 200, message: 'Evento excluído' };
    networkRequestSpy.request.and.returnValue(of(mockResponse));

    component.deleteEvent('123');
    tick();

    expect(networkRequestSpy.request).toHaveBeenCalled();
    expect(toastControllerSpy.create).toHaveBeenCalled();
    expect(navControllerSpy.back).toHaveBeenCalled();
  }));

  it('deleteEvent não deve executar se ID for undefined', () => {
    component.deleteEvent(undefined);
    expect(networkRequestSpy.request).not.toHaveBeenCalled();
    expect(toastControllerSpy.create).not.toHaveBeenCalled();
    expect(navControllerSpy.back).not.toHaveBeenCalled();
  });

  it('deleteEvent não deve executar se ID for null', () => {
    component.deleteEvent(null);
    expect(networkRequestSpy.request).not.toHaveBeenCalled();
    expect(toastControllerSpy.create).not.toHaveBeenCalled();
    expect(navControllerSpy.back).not.toHaveBeenCalled();
  });

  // it('deve criar o componente', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('ionViewDidEnter deve chamar requestPageContent', () => {
  //   spyOn(component, 'requestPageContent');
  //   component.ionViewDidEnter();
  //   expect(component.requestPageContent).toHaveBeenCalledWith('123');
  // });

  // it('requestPageContent deve chamar networkRequest.request com ID', () => {
  //   networkRequestSpy.request.and.returnValue(of({}));
  //   component.requestPageContent('123');
  //   expect(networkRequestSpy.request).toHaveBeenCalled();
  // });

  // it('deleteEvent deve chamar request, criar toast e navegar para trás', fakeAsync(() => {
  //   const mockResponse = { status: 200, message: 'Evento excluído' };
  //   networkRequestSpy.request.and.returnValue(of(mockResponse));

  //   component.deleteEvent('123');
  //   tick(); // aguarda async do subscribe

  //   expect(networkRequestSpy.request).toHaveBeenCalled();
  //   expect(toastControllerSpy.create).toHaveBeenCalled();
  //   expect(navControllerSpy.back).toHaveBeenCalled();
  // }));
});