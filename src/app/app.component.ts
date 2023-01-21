import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  locations: string[] = ['Downtown', 'S. County', 'Lakeside'];
  volunteerForm!: FormGroup;

  get references() : FormArray {
    return this.volunteerForm.get('references') as FormArray;
  }

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.volunteerForm = this._fb.group({
      name: 'Name here',
      phoneNumber: '',
      preferredLocation: '',
      animals: this._fb.group({
        dogs: false,
        cats: false,
        reptiles: false,
      }),
      references: this._fb.array([
        this._fb.control('')
      ])
    });
  }

  onSubmit(): void {
    console.log(this.volunteerForm)
  }

  addEmail() {
    this.references.push(this._fb.control(''))
  }

  removeEmail(i: number) {
    this.references.removeAt(i)
  }

  selectLocation(event: Event): void {
    this.volunteerForm.patchValue({
      preferredLocation: (<HTMLTextAreaElement>event.target)?.value
    })
  }
}
