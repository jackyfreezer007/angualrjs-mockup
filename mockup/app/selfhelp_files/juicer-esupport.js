var arrLength = function (arr) {
    if (arr && arr.length) return arr.length;
    return 0;
};

var null2Empty = function (v) {
    return v ? v : "";
};

var addOne = function (i) {
    if (i) {
        return parseInt(i) + 1
    }
    return 0;
};

var determineChecked = function (variable, value, isDefault) {

    if (!variable && isDefault) {
        return "checked='checked'";
    }
    if (!variable || !value) return "";
    return variable == value ? "checked='checked'" : "";
};

var determineDisabled = function (variable, value, isDefault) {

    if (!variable && isDefault) {
        return "disabled='disabled'";
    }
    if (!variable || !value) return "";
    return variable == value ? "disabled='disabled'" : "";
};

var cutStr = function (variable, limit) {

    if (!variable)  return "";

    if (!limit) return variable;

    if (variable.length < limit) return variable;

    return variable.substr(0, limit) + "...";
};

var subStr = function (variable, limit) {

    if (!variable)  return "";
    if (!limit) return variable;
    var index = variable.indexOf(limit);

    if (index < 0) return variable;

    return variable.substr(0, index);
};

var getSiteURL = function(variable, webDomainId, siteURL){
    if(!variable || !webDomainId || !siteURL) return '';
    if(variable.indexOf('_') > 0 && variable.indexOf('_' + webDomainId + '_') > -1){
        return '(' + siteURL + ')';
    }
    return '';
}

var capitalize = function(string){

    if (!string) return "";

    if (string.length < 1) return "";

    return string.charAt(0).toUpperCase() + string.slice(1);
}

var showIconIfIsVideoLink = function(string){

    if (!string) return false;
    var reg = new RegExp("^.+?/topic/\\d+/video/\\d+$");
    return !(reg.test(string)) ? "" : "<div class=\"gsc-result-icon\"><a href=\""+string+"\"><span class=\"smallplay\"></span></a></div>";
}

var ifNullUse = function(string, defaultValue){

    return (!string) ? defaultValue : string;
}

juicer.register('capitalize', capitalize);
juicer.register('n2e', null2Empty);
juicer.register('cutStr', cutStr);
juicer.register('subStr', subStr);
juicer.register('arrLength', arrLength);
juicer.register('addOne', addOne);
juicer.register('getSiteURL', getSiteURL);
juicer.register('checkedIfEqualOrDefault', determineChecked);
juicer.register('disabledIfEqualOrDefault', determineDisabled);
juicer.register('showIconIfIsVideoLink', showIconIfIsVideoLink);
juicer.register('ifNullUse', ifNullUse);
