var test_value = 'THIS IS THE TEST VALUE';

var obj = [{
    value: 1,
    label: 10
}]

function calcSample2( data ) {
    return 0;
}

function calcSample(data) {
    var result = calcSampleNumber( data );

    return parseFloat(result).toFixed(2);
}

function calcSampleTotal( data ) {
    var result = 0;

    if (data && data.calculations && data.calculations.length) {
        for (var i = 0; i < data.calculations.length; i++) {
            result += calcSampleNumber( data.calculations[i] );
        }
    }

    return parseFloat(result).toFixed(2);
}

function calcSampleNumber( data ) {
    var result = 0;

    if ( data ) {
        if ( data.amount1 ) result += parseFloat( data.amount1 );
        if ( data.amount2 ) result += parseFloat( data.amount2 );
    }

    return result;
}

function doBlurThing(el) {
    console.log( 'on blur fired:' + el.tagName );
    console.log( 'test_value: ' + test_value );
    doPrivateBlurThing( el );
}

function doPrivateBlurThing( el ) {
    console.log( 'on private blur fired:' + el.tagName );
    
}

function doFocusThing(el) {
    console.log('on focus fired:' + el.tagName);
}

function doChangeThing(el) {
    console.log('on changed fired:' + el.tagName);
}

function doSaveThing(){
    console.log("on save fired");
    return true;
}

function doLoadThing() {
    console.log("on load fired");
}

function doValidationThing(value) {
    console.log('validate:' + value);
    //return true;
    return value === 'Jason';
}

var a = 0;

var b = 1;

// Add public functions here
return {
    calcSample2,
    calcSample,
    calcSampleTotal,
    doBlurThing,
    doFocusThing,
    doChangeThing,
    doSaveThing,
    doLoadThing,
    doValidationThing
}


