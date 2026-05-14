import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  
  myForm: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {

    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      agree: [false, Validators.requiredTrue],

      hobbies: this.fb.array([])
    });
  }

  get hobbies(): FormArray {
    return this.myForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.submittedData = this.myForm.value;

    console.log(this.myForm.value);

    this.myForm.reset({
      email: '',
      password: '',
      agree: false
    });

    this.hobbies.clear();
  }
}