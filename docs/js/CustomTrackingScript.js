/* Copyright Bridgeline Digital, Inc. An unpublished work created in 2009. All rights reserved. This software contains the confidential and trade secret information of Bridgeline Digital, Inc. ("Bridgeline").  Copying, distribution or disclosure without Bridgeline's express written permission is prohibited */
// JScript File


var flashEvents = "";
function _uFlash() {
    var f = "-", n = navigator;
    if (n.plugins && n.plugins.length) {
        for (var ii = 0; ii < n.plugins.length; ii++) {
            if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
                f = n.plugins[ii].description.split('Shockwave Flash ')[1];
                break;
            }
        }
    }
    else if (window.ActiveXObject) {
        for (var ii = 10; ii >= 2; ii--) {
            try {
                var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
                if (fl) {
                    f = ii + '.0';
                    break;
                }
            }
            catch (e) {
            }
        }
    }
    return f;
}
function _uVoid() { return; }
function _uUnloadEvent() { return; }
function _uEvent100100() { return; }

var IsNav4 = window.Event ? true : false;

// event codes as defined in the system

var WatchEventCode = 100103;
var Load = 100104;
var Download = 100102;
var NavItemVisitedEventCode = 100120;
var FeaturedItemVisitedEventCode = 100121;
var CrossSellUpSellEventCode = 100122;

var qryString = "";
//The following object types will be used to track objects which are part of framework.
//If this hard-coding is not to be done then it should be an attribute of the container.
var ImageObjectType = 33;
var ContentObjectType = 7;
var ListObjectType = 11;
var MenuObjectType = 2;
var PageObjectType = 8;
var AssetFileObjectType = 9;
//The path is subject to change.
//var swgif="http://localhost:8076/Tracking/WebPageEventLogger.axd";  // This value will be register by base page from appsettings key='DedicateSiteForClientData';
//var siteId='51AADB41-89C8-468C-809D-2826DBFBBCD4';  // This value will be register by base page with current site's guid id

//ObjectId will be unique identifier of the the object
//ObjectUrl of the object if it is an image or hyperlink (accepts null)  
//EventCode will be either load (100002) or click (100001)
function iAPPSTracker(watchId) {
    qryString = "EventCode=" + WatchEventCode +
                "&ObjectUrl=" + watchId + "&SiteId=" + siteId +
                "&ObjectId=null&ReferrerObjectUrl=" + ReferrerUrl + "&ReferrerObjectTypeId=" + ReferrerTypeId + "&ReferrerObjectId=" + PageId;

    var i2 = new Image(1, 1);
    i2.src = swgif + "?" + qryString;
    i2.onload = function () { return; }
    return;
}

function iAPPSNavItemTracker(NavId) {

    iAppsEventTracker(NavId, NavItemVisitedEventCode);
}

function iAPPSFeaturedItemTracker(FeaturedId) {

    iAppsEventTracker(FeaturedId, FeaturedItemVisitedEventCode);
}
function iAPPSCrossSellUpSellItemTracker(SellTypeId) {

    iAppsEventTracker(SellTypeId, CrossSellUpSellEventCode);
}
function iAPPSBrightCoveVideoTracker(playerId) {

    qryString = "EventCode=100125" +
                "&ObjectUrl=" + playerId + "&SiteId=" + siteId +
                "&ObjectId=00000000-0000-0000-0000-000000000000&ReferrerObjectUrl=" + ReferrerUrl + "&ReferrerObjectTypeId=" + ReferrerTypeId + "&ReferrerObjectId=" + PageId;

    var i2 = new Image(1, 1);
    i2.src = swgif + "?" + qryString;
    i2.onload = function () { return; }
    return;
}

function iAppsEventTracker(ObjectId, EventCode) {
    if (ObjectId != "00000000-0000-0000-0000-000000000000" && ObjectId != undefined && ObjectId != null) {
        qryString = "EventCode=" + EventCode +
                "&ObjectUrl=null&SiteId=" + siteId +
                "&ObjectId=" + ObjectId + "&ReferrerObjectUrl=" + ReferrerUrl + "&ReferrerObjectTypeId=" + ReferrerTypeId + "&ReferrerObjectId=" + PageId;

        var i2 = new Image(1, 1);
        i2.src = swgif + "?" + qryString;
        i2.onload = function () { return; }
        return;
    }
}