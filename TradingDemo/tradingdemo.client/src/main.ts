import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
/*import { AppComponent } from './app/app.component';*/
import { AppModule } from './app/app.module';
import 'chartjs-adapter-date-fns';
//import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
//import { bootstrapApplication } from '@angular/platform-browser';
export function getBaseUrl() {
  return "https://localhost:7117/api/";
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

//bootstrapApplication(AppComponent, {
//  providers: [provideCharts(withDefaultRegisterables())],
//}).catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
