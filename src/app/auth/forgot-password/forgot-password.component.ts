import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SeValidators, AlertService } from '../../shared/index';
import { ConsoleInterface } from "../../shared/services/console.service";
import * as moment from 'moment';
import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//service
import { HeaderService } from '../../header/header.service';
import { AuthService } from '../../core';
import Utils from '../../core/utils';

@Component({
	selector: 'ss-forgot-password',
	templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
	errorFlag: boolean = false;
	formErrors!: string[];
	loading: boolean = false;
	forgotPasswordForm: FormGroup;
	data: any;
	is_unique_email: Boolean = false;
	is_unique_email_msg = '';
	email: FormControl;
	constructor(
		private router: Router,
		private authService: AuthService,
		private alerter: AlertService,
		private formBuilder: FormBuilder,
		private seConsole: ConsoleInterface,
		private headerService: HeaderService,
		private translate: TranslateService
		) {
		this.headerService.setShowHeader(false);
		this.headerService.setShowFooter(false);
	}

	ngOnInit(): void {
		this.email = new FormControl('', [Validators.required, Validators.email]);
		this.forgotPasswordForm = this.formBuilder.group(
			{
				email: this.email,
			}
		);
	}
	forgotPassword() {

		if (this.forgotPasswordForm.valid && this.is_unique_email) {
			this.loading = true;

			this.authService.forgot_password(this.forgotPasswordForm.value).subscribe(
				result => {
					this.data = result;
					if (result.status=="success") {
						this.alerter.showSuccess(result.msg, true, true, false);
						this.router.navigate(["/auth/login"]);
					} else {

						let msg = Utils.isempty(result.msg)?Utils.objToStr(result.data):result.msg;
						this.alerter.showError(msg, true, true, false);
					}
					
					this.loading = false;
				},
				err => {
					this.loading = false;
					console.log(err);
				}
			);
		} else {
			this.formErrors = []
			this.errorFlag = true;
			this.validateAllFormFields(this.forgotPasswordForm);
		}
	}

	// Check Email is exits or not
	isEmailUnique() {
		if (this.email.valid) {
			this.authService.isEmailUnique({ 'current_email': this.email.value }).subscribe(
				result => {
					this.data = result;
					this.is_unique_email = this.data.status;;
					let emailAddDoesNotExist= this.translate.instant('forgotPassword.emailAddDoesNotExist')
					this.is_unique_email_msg = this.is_unique_email ? '' : emailAddDoesNotExist;
					this.is_unique_email && this.forgotPassword();
				},
				err => {
					console.log(err);
				}
			);
		} else {
			this.is_unique_email = true;
			this.is_unique_email_msg = '';
			this.validateAllFormFields(this.forgotPasswordForm);
		}
	}

	validateAllFormFields(formGroup: FormGroup) {
		//{1}
		Object.keys(formGroup.controls).forEach(field => {
			//{2}
			const control = formGroup.get(field); //{3}
			if (control instanceof FormControl) {
				//{4}
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				//{5}
				this.validateAllFormFields(control); //{6}
			}
		});
	}

}
