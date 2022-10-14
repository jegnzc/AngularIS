import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  description: string;
  title: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
    this.title = data.title;
  }

  confirm() {
    this.dialogRef.close(true);
  }

  deny() {
    this.dialogRef.close(false);
  }
}


//import { Component, Inject, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup } from '@angular/forms';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//export interface DialogData {
//  animal: string;
//  name: string;
//}

//@Component({
//  selector: 'app-edit-dialog',
//  templateUrl: './edit-dialog.component.html',
//  styleUrls: ['./edit-dialog.component.scss']
//})
//export class EditDialogComponent implements OnInit {

//  form: FormGroup;
//  description: string;
//  title: string;

//  constructor(
//    private fb: FormBuilder,
//    private dialogRef: MatDialogRef<EditDialogComponent>,
//    @Inject(MAT_DIALOG_DATA) data) {

//    this.description = data.description;
//    this.title = data.title;
//  }

//  ngOnInit() {
//    this.form = this.fb.group({
//      description: [this.description, []]
//    });
//  }

//  save() {
//    this.dialogRef.close(this.form.value);
//  }

//  close() {
//    this.dialogRef.close();
//  }
//}
