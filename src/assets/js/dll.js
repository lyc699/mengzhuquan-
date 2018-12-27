/**
 * Created by zzm on 2017/10/20.
 */
export function getPhoneType(){

    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        //alert("安卓手机");
        return "android"
        // window.location.href = "mobile/index.html";
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // window.location.href = "mobile/index.html";
        return "ios"
        //alert("苹果手机");
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        //alert("winphone手机")
        return "winphone"
        // window.location.href = "mobile/index.html";
    }
}