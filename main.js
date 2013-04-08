var D={}, zoom, st, sre=/^(.{3,}?)(a|e|i|o|u|ski|ški|ško|sko|ih|em|ale|anje|sti|iki)$/, ptr=0,exps=["4c0","0ae","a0e","f4f"],anch;

function create() {    
    zoom = $get("zoom"); st = document.styleSheets[1];
    _c.doeach(function(x){if(x){expose(x,stem(x))}},window.location.hash.substr(1).split(","));
    $get("jansaO").innerHTML = genWall($get("jansa").innerHTML);
    $get("bratusekO").innerHTML = genWall($get("bratusek").innerHTML);
    $get("words").innerHTML = genWords(D);
}

function genWall(t) {
    return _c.reduce(function(acc,x){
	y=stem(x);count(y);
	return acc + "<div style='float:left;background-color:"+calcBgC(x)+";' data-word='"+(x)+"' class='"+(y)+"' onmouseover='over(this)' onclick='exposePix(this)'>&nbsp;</div>"; 
    }, t.split(/[  \n,#.!:;?"]+/), "");
}

function exposePix(el){expose(el.getAttribute('data-word'),el.className)}

function genWords(D) {
    return _c.reduce(function(acc,x){return acc+="<a href='javascript:void(0)' onclick='expose(this.innerHTML,stem(this.innerHTML))' style='font-size:"+(Math.log(x[1])*6)+"px;color:"+calcBgC(x[0])+";'>"+x[0]+"</a> "}, calcWords(D), "");
}

function calcBgC(w) { return "rgb("+(0+w.length*15)+",5,5)" }

function calcWords(D) {
    return _c.reduceObj(function(acc,k,v){acc.push([k,v]); return acc}, D, []).sort(function(a,b){return b[1]-a[1]})
}

function over(el) { zoom.innerHTML = el.getAttribute("data-word"); }

function expose(w,sw) {
    $get('exp'+ptr).innerHTML = w;
    st.deleteRule(ptr);
    st.insertRule("body div div."+sw+" {border: 2px solid #"+exps[ptr]+"; border-width: 3px 1px 4px 1px; width: 4px; height: 0px}", ptr)
    rotate();
}

function stem(w) {
    return (sre.test(w)?sre.exec(w)[1]:w).toLowerCase();
}

function count(w) {D[w]=D[w]?D[w]+1:1;}
function rotate() {$get('exp'+ptr).className = ""; ptr=rotPtr(ptr); $get('exp'+ptr).className = "act"; }

function rotPtr(p) {return p>=2?0:p+1;}