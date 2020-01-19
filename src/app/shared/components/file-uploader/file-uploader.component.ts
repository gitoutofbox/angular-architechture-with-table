import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  public image: string;
  constructor() { }

  ngOnInit() {
  }

  
  selectFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.userForm.patchValue({ photo: file });
    // this.photo.updateValueAndValidity();

    // Preview image
     if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.onFileSelect.emit(file);
    }
  }
}
