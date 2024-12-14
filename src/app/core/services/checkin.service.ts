import { Injectable } from "@angular/core";
import { Observable , BehaviorSubject ,Subject} from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { ApiService } from "./api.service";
import { TokenService } from "./token.service";

import { map } from "rxjs/operators";
import { Profile,LoginRequest } from "./../models/index";
import { 
    PlayGetGeneralCheckin,
    PreGetGeneralList,
    PlayNextGeneralCheckin
} from "../models/checkin";
import { Router } from "@angular/router";
import { AlertService } from "../../shared/index";
import { HeaderService } from "src/app/header/header.service";

import Utils  from "src/app/core/utils";

@Injectable({
    providedIn: "root",
})
export class CheckinService {

    constructor(
        private tokenService: TokenService,
        private apiService: ApiService,
        private alerter: AlertService,
        public router: Router,
        private translate: TranslateService,
    ) {
    } 

    getGeneralCheckin(reqBody:PlayGetGeneralCheckin):Observable<any>{
        return this.apiService
            .post("survey/acronym-questionnaire", reqBody, true);
    }
    
    nextQuestionnaire(reqBody:PlayNextGeneralCheckin):Observable<any>{
        return this.apiService
            .post("survey/next-acronym-questionnaire", reqBody, true);
    }

    getGenearalList():Observable<PreGetGeneralList>{

        return this.apiService
            .get("survey/get-general-checkin", {}, true);
    }
}
