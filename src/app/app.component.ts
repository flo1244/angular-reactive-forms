import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  //custom validators
  forbiddenUsername = ['Chris', 'Ann']

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({ //nesting 
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //second value allows us to add validators.
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), // passing array of validators.
      }),
      // 'username': new FormControl(null, Validators.required), //second value allows us to add validators.
      // 'email': new FormControl(null, [Validators.required, Validators.email]), // passing array of validators.
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value);
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (status) => console.log(status);
    // );
    // this.signupForm.setValue({ pre populate the set value or use patchValue to populate part of it.
    //   'userData': {
    //     .../
    //   }
    // })
      
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset(); //resets our form
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    return (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  
  forbiddenNames(control: FormControl): { [is: string]: boolean } {
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  
  }
//async validators
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
