import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

const FIELD = 'roomName';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.scss']
})
export class AddRoomDialogComponent {

  addRoomFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddRoomDialogComponent, string>,
    private fb: FormBuilder
  ) {
    this.addRoomFormGroup = this.fb.group({
      [FIELD]: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/),
        Validators.maxLength(10)
      ]]
    });
  }

  get roomName() {
    return this.addRoomFormGroup.get(FIELD);
  }

  submit(): void {
    const input = this.roomName?.value;
    if (input && this.addRoomFormGroup.valid) {
      const trimInput = input.toLowerCase().replace(/\s+/g, ' ').trim();
      this.dialogRef.close(trimInput);
    }
  }

}
