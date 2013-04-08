var _c = {
    map: function (f, arr) {
        var r = [];
        for (i=0;i< arr.length;i++) { r[i] = f(arr[i]); }
        return r;
    },

    reduce: function (f, arr, s) {
        var r = s;
        for (var i = 0; i < arr.length; i++) { r = f( r, arr[i] ); }  
        return r;
    },

    reduceI: function (f, arr, s) {
        var r = s;
        for (var i = 0; i < arr.length; i++) { r = f( r, arr[i], i ); }  
        return r;
    },

    reduceObj: function (f, obj, s) {
        var r = s;
        for (k in obj) { r = f( r, k, obj[k] ); }  
        return r;
    },
    
    doeach: function ( f, arr ) {
        for (var i = 0; i < arr.length; i++) { f( arr[i], i ); }
    },
    
    seek: function (f, arr) {
        for (var i = 0; i < arr.length; i++) { var t = f(arr[i], i); if (t) return t; }
        return false;
    },

    has: function (n, arr) {
        return this.seek(function(e, i){ return e == n; }, arr);
    },
};
function $d(a,t){if (window['console'] && window['console']['debug']) console.debug(t ? a + " <<- " : a); return a; }
function $get(id) { return document.getElementById(id); }
