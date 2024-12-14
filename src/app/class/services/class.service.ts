import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppConfig } from '../../core/app.config';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import Utils  from "src/app/core/utils";
import { ClassListData,VirtualVisit,PrevClassData, PrevObjectiveData,AttendanceData,PrevPracticeLogData } from '../models/class';

@Injectable({
    providedIn: 'root',
})
export class ClassService {

    constructor(
        private apiService: ApiService,
    ) {
    } 

    getClassList(data:{}):Observable<ClassListData>{
        return this.apiService.post(
            "course/class-list",data
        );
    }

    getVirtualVisit(data:{}):Observable<VirtualVisit>{
        return this.apiService.get(
            "course/get-virtual-visits",data
        );
    }

    getClassDetail(data:{class_id:string|null}):Observable<PrevClassData>{
        return this.apiService.post(
            "course/class-detail",data
        );
    } 

    updateClassObjective(data:{class_objective_id:string|null}):Observable<PrevObjectiveData>{
        return this.apiService.post(
            "course/update-class-task",data
        );
    }

     attendanceVisit(data:{visit_id:string}):Observable<AttendanceData>{
        return this.apiService.post(
            "user/attendance-visit",data
        );
    } 

     getPracticeLog(data:{class_id:string|null}):Observable<PrevPracticeLogData>{
        return this.apiService.post(
            "course/get-practice-log",data
        );
    } 
}
