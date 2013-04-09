var D={}, zoom, st, sre=/^(.{3,}?)(a|e|i|o|u|ski|ški|ško|sko|ih|em|ale|anje|sti|iki)$/, ptr=0,exps=["4c0","0ae","e0c","fb0"],anch,words=["","","",""],EL1,EL2;

function create() {    
    zoom = $get("zoom"); st = document.styleSheets[1];
    _c.doeach(function(x){if(x){expose(x,stem(x))}},window.location.hash.substr(1).split(","));
    createWalls(function(){return this});
    $get("words").innerHTML = genWords(D);
    
    document.onkeypress = (function(e){var k = e?e.which:window.event.keyCode; if (k == 32) { read(); return false; }})
}

function createWalls(sf) {
    $get("jansaO").innerHTML = genWall($get("jansa").innerHTML.toLowerCase(), sf);
    $get("bratusekO").innerHTML = genWall($get("bratusek").innerHTML.toLowerCase(), sf);
}

function genWall(t,sf) {
    return _c.reduce(function(ac,x){
	y=stem(x);count(y);
	return ac + "<div style='float:left;background-color:"+calcBgC(x)+";' data-word='"+(x)+"' class='"+(y)+"' onmouseover='over(this)' onclick='exposePix(this)'>&nbsp;</div>"; 
    }, sf.call(t.split(/[  \n,#.!:;?"]+/)), "");
}

function exposePix(el){expose(el.getAttribute('data-word'),el.className)}

function genWords(D) {
    return _c.reduce(function(ac,x){return ac+="<a href='javascript:void(0)' onclick='expose(this.innerHTML,stem(this.innerHTML))' style='font-size:"+(Math.log(x[1])*6)+"px;color:"+calcBgC(x[0])+";'>"+x[0]+"</a> "}, calcWords(D), "");
}

function calcBgC(w) { return "rgb("+(0+w.length*15)+",5,5)" }

function calcWords(D) {
    return _c.reduceObj(function(ac,k,v){ac.push([k,v]); return ac}, D, []).sort(function(a,b){return b[1]-a[1]})
}

function over(el) { zoom.innerHTML = '<b>'+el.getAttribute("data-word")+'</b>'; EL1=EL2=el}
function read() { EL1 = EL1.previousSibling; EL2 = EL2.nextSibling; zoom.innerHTML = EL1.getAttribute("data-word")+' '+zoom.innerHTML+' '+EL2.getAttribute("data-word")}

function expose(w,sw) {
    $get('exp'+ptr).innerHTML = w;
    st.deleteRule(ptr);
    st.insertRule("body div div."+sw+" {border: 2px solid #"+exps[ptr]+"; border-width: 3px 1px 4px 1px; width: 4px; height: 0px}", ptr)
    words[ptr]=w;
    rotate();rehash();
}

function readTimer(){
		     function resetTimer() {
			 window.clearTimeout(timerHandle);
			 timerHandle = setTimeout("alert('Hello')",3000);
		     }}
function stem(w) { return (sre.test(w)?sre.exec(w)[1]:w) }
function count(w) {D[w]=D[w]?D[w]+1:1}
function rehash() {window.location.hash=_c.reduceI(function(ac,x,i){return ac+(i==0?"":",")+x},words,"")}
function rotate() {$get('exp'+ptr).className = ""; ptr=rotPtr(ptr); $get('exp'+ptr).className = "act"}
function rotPtr(p) {return p>=3?0:p+1}
