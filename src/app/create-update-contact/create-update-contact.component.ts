import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.scss']
})
export class CreateUpdateContactComponent implements OnInit {
  public isUpdate: boolean = false;
  public name: string;
  public number: string;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.name = this.data.name;
    this.number = this.data.number;
    if (this.data.name != '' && this.data.number != '') {
      this.isUpdate = true;
    } 
  }

  ngOnInit(): void {
  }

  addUpdateContact() {
    if (this.name == '' || this.number == '') {
      return;
    }
    this.dialogRef.close({
      name: this.name,
      number: this.number
    });
  }
}

export interface DialogData {
  name: string;
  number: string;
}