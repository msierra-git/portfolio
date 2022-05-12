/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Validation Codes                     *
 *   Date:            2022                                 *
 ==========================================================*/

 
export function requiredValidator(fieldName, fieldValue, errorSpan) {
    let errorDisplay = document.getElementById(errorSpan);
    let hasError = checkMandatory(fieldValue);
    let fieldNameUp = fieldName.toUpperCase();
    let isTimeField = fieldNameUp.indexOf('TIME');
    if (hasError) {
        errorDisplay.innerHTML = fieldName + " must have a value";
    } else {
        if (isTimeField > 0) {
            let hasError2 = timeFormatValidator(fieldValue);
            if (hasError2) {
                errorDisplay.innerHTML = "Invalid Time Format. Should be like 8:00 am or 9:45am";
                hasError = hasError2;
            } else {
                errorDisplay.innerHTML = "";
            }
        } else {
            errorDisplay.innerHTML = "";
        }
    }
    return !hasError;
}


export function radioReqValidator(fieldName, fieldMsg, errorSpan) {
    let errorDisplay = document.getElementById(errorSpan);
    let radios = fieldName;
    let selected_value = "";
    for (item in radios) {
        if (radios[item].checked) {
            selected_value = radios[item].value;
            break;
        }
    }
    let hasError = checkMandatory(selected_value);
    if (hasError) {
        errorDisplay.innerHTML = fieldName + " must select a " + fieldMsg + " option";
    } else {
        errorDisplay.innerHTML = "";
    }
    return !hasError;
}


export function checkboxReqValidator(fieldName, fieldMsg, errorSpan) {
    let errorDisplay = document.getElementById(errorSpan);
    let checks = fieldName;
    let selected_values = [];
    for (var i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            selected_values.push(checks[i].value);
        }
    }
    let hasError = checkMandatory(selected_values.toString());
    if (hasError) {
        errorDisplay.innerHTML = fieldName + " must select at least one " + fieldMsg + "";
    } else {
        errorDisplay.innerHTML = "";
    }
    return !hasError;
}


export function timeFormatValidator(fieldValue) {
    let timeFormat = /^(1[0-2]|0?[1-9]):[0-5][0-9] ?((a|p)m|(A|P)M)$/i;
    let hasError = timeFormat.test(fieldValue.trim()) ? false : true;
    return hasError;
}


export function checkMandatory(fieldValue) {
    let hasError = false;
    if (fieldValue === "") {
        hasError = true;
    }
    return hasError;
}


