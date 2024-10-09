import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule  } from '@angular/material/dialog'
import { MatToolbar, MatToolbarRow} from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) 
    public dialogData:any, 
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CategoryComponent>) {}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null,[Validators.required]]
    });

    if(this.dialogAction == "Edit"){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }
  
}
