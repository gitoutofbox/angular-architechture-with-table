import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  @ViewChild('fileUpoader',{static: false}) fileUpoader: ElementRef<HTMLElement>;
  public image      : string = '';
  public imageName  : string = '';
  constructor() { }
  ngOnInit() {}

  triggerClick() {
    let fileElement: HTMLElement = this.fileUpoader.nativeElement;
    fileElement.click();
}
  
  selectFile(event: Event) {
    const file      = (event.target as HTMLInputElement).files[0];
    this.imageName  = file.name;
    // Preview image
     if (file) {
      const reader  = new FileReader();
      reader.onload = () => {
        this.image  = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.onFileSelect.emit(file);
    }
  }
}
