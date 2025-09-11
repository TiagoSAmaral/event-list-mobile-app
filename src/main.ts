import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from '@core/app.routes';
import { AppComponent } from '@core/app.component';
import NetworkRequest from '@shared/services/network/network.request';
import { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import errorInterceptor from '@shared/services/interceptor/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ), 
    { provide: NETWORK_REQUEST, useClass: NetworkRequest }
  ],
});
