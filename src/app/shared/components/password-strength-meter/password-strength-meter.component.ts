import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss']
})
export class PasswordStrengthMeterComponent implements OnInit, OnChanges {
  @Input() password: string;
  @Input() minLength: number = 8;
  @Output() strengthChange = new EventEmitter<number>();
  public strengthText: string = '';
  public score: number = 0;
  public feedbackArr: Array<Object> = [];
  constructor() { }

  ngOnInit() {
    // this.checkStrength();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.checkStrength();
    }
  }

  checkStrength() {
    this.feedbackArr = [];
    this.score = 0;
    this.score = this.isLengthMet() ? this.score + 1 : this.score;
    this.score = this.isSpecialCharMet() ? this.score + 1 : this.score;
    this.score = this.isNumberMet() ? this.score + 1 : this.score;
    this.score = this.isSmallcaseMet() ? this.score + 1 : this.score;
    this.score = this.isUppercaseMet() ? this.score + 1 : this.score;
    this.getStrengthText();
    console.log('this.score', this.score)
  }
  isLengthMet() {
    if(this.password.length >= this.minLength) {
      this.feedbackArr.push({'label': `Minimum ${this.minLength} characters`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `Minimum ${this.minLength} characters`, status: false});
      return false;
    }
  }
  isSpecialCharMet() {
    if( (/[!@#$%*]/).test(this.password) ){
      this.feedbackArr.push({'label': `One special characters`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One special characters`, status: false});
      return false;
    }
  }
  isNumberMet() {
    if((/[0-9]/).test(this.password)) {
      this.feedbackArr.push({'label': `One number`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One number`, status: false});
      return false;
    }
  }
  isSmallcaseMet() {
    if( (/[a-z]/).test(this.password) ) {
      this.feedbackArr.push({'label': `One smallcase character`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One smallcase character`, status: false});
      return false;
    }
  }
  isUppercaseMet() {
    if( (/[A-Z]/).test(this.password) ) {
      this.feedbackArr.push({'label': `One uppercase character`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One uppercase character`, status: false});
      return false;
    }
  }

  getStrengthText() {
    this.strengthText = ''
    switch (this.score) {
      case 1:
        this.strengthText = 'Too short';
        break;
      case 2:
        this.strengthText = 'Weak';
        break;
      case 3:
        this.strengthText = 'Fair';
        break;
      case 4:
        this.strengthText = 'Good';
        break;
      case 5:
        this.strengthText = 'Strong';
        break;

    }
  }
}
