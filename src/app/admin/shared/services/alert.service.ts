import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string) {
    return this.alert$.next({ type: 'success', text });
  }

  warning(text: string) {
    return this.alert$.next({ type: 'warning', text });
  }

  danger(text: string) {
    return this.alert$.next({ type: 'danger', text });
  }
}
