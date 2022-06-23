import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  public text = '';
  public type = 'success';
  alertSub = new Subscription();

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertSub = this.alertService.alert$.subscribe((alert: Alert) => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if (this.alertSub) this.alertSub.unsubscribe();
  }
}
