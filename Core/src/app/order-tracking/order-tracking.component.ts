import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProgressBarConfig } from '../models/progress-bar-config';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  @ViewChild('progressbar', { static: true }) progressbar!: ElementRef;

  private config: ProgressBarConfig = {
    iconPosition: 2,
    iconColor: '#FF5722'
  };

  constructor() {}

  ngOnInit() {
    // const steps = this.progressbar.nativeElement.querySelectorAll('li');
  
    // const icon = document.createElement('i');
    // icon.classList.add('fas', 'fa-circle');
    // icon.style.position = 'absolute';
    // icon.style.fontSize = '24px';
    // icon.style.color = this.config.iconColor;
    // (steps[this.config.iconPosition] as HTMLElement).appendChild(icon);
  
    // const connectors = this.progressbar.nativeElement.querySelectorAll('li:not(:last-child)::after');
  
    // for (let i = 0; i < connectors.length; i++) {
    //   (connectors[i] as HTMLElement).style.backgroundColor = this.config.iconColor;
    // }
  }
}


