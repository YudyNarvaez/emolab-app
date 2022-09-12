import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  emotion = '';
  probs: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.emotion = this.router.getCurrentNavigation().extras.state.data.emocion;
    this.probs = this.router.getCurrentNavigation().extras.state.data.probs;
    console.log(this.probs)
    switch (this.emotion) {
      case 'others':
        this.emotion = 'OTROS';
        break;
      case 'joy':
        this.emotion = 'ALEGRÍA';
        break;
      case 'sadness':
        this.emotion = 'TRISTEZA';
        break;
      case 'surprise':
        this.emotion = 'SORPRESA';
        break;
      case 'disgust':
        this.emotion = 'DESAGRADO';
        break;
      case 'anger':
        this.emotion = 'ENOJO';
        break;
    }
  }
}
