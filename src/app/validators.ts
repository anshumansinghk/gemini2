import { AbstractControl, ValidationErrors } from '@angular/forms';

export function atLeastOneCheckboxSelectedValidator() {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const anyChecked = (formArray as any).controls.some((control: AbstractControl) =>
      control.get('response')?.value
    );
    return anyChecked ? null : { atLeastOneSelected: true };
  };
}
