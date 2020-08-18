import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Inject } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router'
import { ApmService } from '@elastic/apm-rum-angular'

import { AppComponent } from './app.component';

const routes: Routes = [

]



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes)
  ],
  providers: [
  {
    provide: ApmService,
    useClass: ApmService,
    deps: [Router]
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(ApmService) service: ApmService) {
    // API is exposed through this apm instance
    const apm = service.init({
      serviceName: 'angular-test-app',
      serverUrl: 'http://10.21.21.21:8200'
    })

    apm.setUserContext({
      'username': 'foo',
      'id': 'bar'
    })
  }
	}
