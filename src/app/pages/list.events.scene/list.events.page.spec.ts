import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ListEventsScenePage } from './list.events.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import NetworkRequest from '@shared/services/network/network.request';
import { RouterTestingModule} from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';


describe('ListEventsScenePage', () => {
  let component: ListEventsScenePage;
  let fixture: ComponentFixture<ListEventsScenePage>;
  let networkRequestSpy: jasmine.SpyObj<any>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const networkSpy = jasmine.createSpyObj('NETWORK_REQUEST', ['request']);
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const mockToast = { present: jasmine.createSpy('present') };

    toastSpy.create.and.returnValue(Promise.resolve(mockToast));

    await TestBed.configureTestingModule({
      // declarations: [ListEventsScenePage],
      providers: [
        { provide: NETWORK_REQUEST, useValue: networkSpy },
        { provide: ToastController, useValue: toastSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEventsScenePage);
    component = fixture.componentInstance;

    networkRequestSpy = TestBed.inject(NETWORK_REQUEST) as jasmine.SpyObj<any>;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('ionViewDidEnter deve chamar requestPageContent', () => {
    spyOn(component, 'requestPageContent');
    component.ionViewDidEnter();
    expect(component.requestPageContent).toHaveBeenCalled();
  });

  it('requestPageContent deve chamar networkRequest.request', () => {
    networkRequestSpy.request.and.returnValue(of({}));
    component.requestPageContent();
    expect(networkRequestSpy.request).toHaveBeenCalled();
  });

  it('deleteEvent deve chamar request, criar toast e atualizar lista', fakeAsync(() => {
    const mockResponse = { status: 200, message: 'Evento excluído' };
    networkRequestSpy.request.and.returnValue(of(mockResponse));

    spyOn(component, 'requestPageContent');

    component.deleteEvent('123');
    tick(); // aguarda async do subscribe

    expect(networkRequestSpy.request).toHaveBeenCalledWith(jasmine.any(Object));
    expect(toastControllerSpy.create).toHaveBeenCalled();
    expect(component.requestPageContent).toHaveBeenCalled();
  }));

  it('openDescription deve chamar router.navigate com ID correto', () => {
    component.openDescription('456');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tabs/tab1/detail', '456']);
  });
});