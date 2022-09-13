import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const FIELD = 'name';

@Component({
  selector: 'app-enter-name-dialog',
  templateUrl: './enter-name-dialog.component.html',
  styleUrls: ['./enter-name-dialog.component.scss']
})
export class EnterNameDialogComponent {

  enterNameForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: string,
    private dialogRef: MatDialogRef<EnterNameDialogComponent, string>,
    private fb: FormBuilder
  ) {
    this.enterNameForm = this.fb.group({
      [FIELD]: [data, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/),
        Validators.maxLength(15)
      ]]
    });
  }

  get name() {
    return this.enterNameForm.get(FIELD);
  }

  submit(): void {
    const input = this.name?.value as string;
    if (input && this.enterNameForm.valid) {
      const trimInput = input.replace(/\s+/g, ' ').trim();
      this.dialogRef.close(trimInput);
    }
  }

}
