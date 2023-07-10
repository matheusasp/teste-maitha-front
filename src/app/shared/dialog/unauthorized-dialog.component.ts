import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unauthorized-dialog',
  templateUrl: './unauthorized-dialog.component.html',
  styleUrls: ['./unauthorized-dialog.component.css']
})
export class UnauthorizedDialogComponent {
  constructor(public dialogRef: MatDialogRef<UnauthorizedDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
