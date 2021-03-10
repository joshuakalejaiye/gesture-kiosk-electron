
// This is transpiled typescript code, it is not particularly readable
// It allows the program to store and update cookie information
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionCookie = exports.setSessionCookie = void 0;
var Cookies = require("js-cookie");
exports.setSessionCookie = function (session) {
    Cookies.remove("session");
    Cookies.set("session", session, { expires: 14 });
};
exports.getSessionCookie = function () {
    var sessionCookie = Cookies.get("session");
    if (sessionCookie === undefined) {
        return {};
    }
    else {
        return JSON.parse(sessionCookie);
    }
};



