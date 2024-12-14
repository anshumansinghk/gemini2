/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/

import { Pipe, PipeTransform } from "@angular/core";
// import { TranslateService } from "@ngx-translate/core";
import { Observable } from "../commonAngular";

@Pipe({
    name: "ssCodeFormatDisplay",
})
export class SsCodeDropListFormatDisplayPipe implements PipeTransform {
    private _loadingMessage: string = "loadingmessage";
    private _loadingMessageTranslated: string = "";
    private _dropDownSelect: string = "dropDownSelect";
    private _dropDownSelectTranslated: string = "";
    private displayMode: string = "description";
    private displaySeperator: string = " - ";
    private displayPrefix: string = "";
    private displaySuffix: string = "";
    constructor() {}

    transform(value: any, displayMode: string, displaySeperator: string, displayPrefix: string, displaySuffix: string, option: any): string | Observable<any> {
        if (value == null) value = "";

        this.displayMode = displayMode;
        this.displaySeperator = displaySeperator;
        this.displayPrefix = displayPrefix;
        this.displaySuffix = displaySuffix;
        value = this.formatDisplay(option);

        return value;
    }

    formatDisplay(option: any): string {
        if (option.codeValue == this._loadingMessage || option.codeDesc == this._loadingMessage) {
            return option.codeDesc;
        }
        if (option.codeDesc == this._dropDownSelect || option.codeValue == this._dropDownSelect) {
            return option.codeDesc;
        }

        var output: string = "";

        if (this.displayMode == "value") {
            output = option.codeValue;
        }
        if (this.displayMode == "description") {
            output = option.codeDesc;
        }
        if (this.displayMode == "valuefirst") {
            output =
                option.codeValue +
                " " +
                this.displaySeperator +
                option.codeDesc;
        }

        if (this.displayMode == "descriptionfirst") {
            output =
                option.codeDesc +
                " " +
                this.displaySeperator +
                option.codeValue;
        }

        output = this.displayPrefix + output + this.displaySuffix;

        return output;
    }
}
