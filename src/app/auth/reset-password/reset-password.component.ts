import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SeValidators, AlertService } from '../../shared/index';
import { ConsoleInterface } from "../../shared/services/console.service";
import * as moment from 'moment';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//service
import { HeaderService } from '../../header/header.service';
import { AuthService } from '../../core';

@Component({
	selector: 'ss-reset-password',
	templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
	loading: boolean = false;

	resetPasswordForm: FormGroup;
	password: FormControl;
	confirm_password: FormControl;
	errorFlag: boolean = false;
	formErrors!: string[];
	code: any;
	type_password: any;
	heading: String = '';
	is_success = false;
	is_password_valid: any = {
		is_length: false,
		is_space: false,
		is_capital: false,
		is_small: false,
		is_symbol: false,
		is_not_symbol: false,
		is_number: false,
	};
	allowed_symbol = "$@!%*?&";
	overlayHidden: boolean = false;
	passType: any = {'password':'password','confirmPassword':'password'};
	constructor(
		private formBuilder: FormBuilder, 
		private authService: AuthService, 
		private route: ActivatedRoute,
		private router: Router, 
		private alerter: AlertService,
		private translate: TranslateService,
		private headerService: HeaderService

		) {
		this.route.params.subscribe(params => (this.code = params.id));
		this.type_password = (this.router.routerState.snapshot.url).split('/')[1]; //create password  or reset password
	}

	ngOnInit() {
		this.headerService.setShowHeader(false);
		this.password = new FormControl('', [Validators.required]);
		this.confirm_password = new FormControl('', [Validators.required]);
		this.resetPasswordForm = this.formBuilder.group(
			{
				password: this.password,
				confirm_password: this.confirm_password
			},
			{
				validator: this.match_password,
			}
		);

		this.checkCode();
	}

	match_password(g: FormGroup) {
		return (g as any).get('password').value === (g as any).get('confirm_password').value ? null : { match_password: true };
	}

	checkCode() {
		if (this.code) {
			this.authService.resetPasswordCode({ code: this.code }).subscribe(
				result => {
					if (result.status=="error") {
						// this.toasterService.presentToast(result.msg, result.status);
						this.alerter.showError(result.msg, true, true, false)
						this.router.navigate(['/auth/login']);
					}else{
						this.alerter.showSuccess(result.msg, true, true, false)
					}
				},
				err => {
					console.log(err);
				}
			);
		}
	}

	save() {
		if (this.resetPasswordForm.valid && this.check_password_validaty()) {
			let input = JSON.parse(JSON.stringify(this.resetPasswordForm.value));
			input.code = this.code;
			input.type = 'reset';
			input.password = encodeURIComponent(this.password.value);
			input.confirm_password = encodeURIComponent(this.confirm_password.value);

			this.authService.changePassword(input).subscribe(
				result => {
					if (result.status=="success") {
						// this.overlayHidden = !this.overlayHidden;
						this.alerter.showSuccess(result.msg, true, true, false)

						this.router.navigate(["/auth/login"]);
					} else {
						this.headerService.setShowHeader(false);
						this.alerter.showError(result.msg, true, true, false)
					}
				},
				err => {
					console.log(err);
				}
			);
		} else {
			this.formErrors = []
			this.errorFlag = true;
			// this.validateAllFormFields(this.form);
		}
	}
	check_password_validaty() {
		let p = this.is_password_valid;

		if (p.is_not_symbol) {
			let error = this.translate.instant('resetPassword.allowedSpecialCharacter') + this.allowed_symbol + this.translate.instant('resetPassword.only');
			// this.toasterService.presentToast(error, 'error');
			this.alerter.showError(error, true, true, false);

			this.is_password_valid.is_symbol = !1;
		}

		return (p.is_length && p.is_space && p.is_capital && p.is_small && p.is_symbol && p.is_number && !p.is_not_symbol);
	}

	checkPassword(pass: any) {
		let password = pass.target.value
		this.is_password_valid = {
			is_length: !(password.length < 8),
			is_space: !/\s/g.test(password) && (password.length>1),
			is_capital: /[A-Z]/g.test(password),
			is_small: /[a-z]/g.test(password),
			is_symbol: (/[$@!%*?&]/g.test(password)),
			is_not_symbol: (/[\\" "#'()+,-./:;<=>[\]^_`{|}~]/g.test(password)),
			is_number: /\d/g.test(password),
		};

		if (this.is_password_valid.is_not_symbol) {
			this.is_password_valid.is_symbol = !1;
		}
	}

	showPassword(type:string) {
		this.passType[type] = this.passType[type] == 'password' ? 'text' : 'password';
	}

}
