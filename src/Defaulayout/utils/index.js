export function SmoothScroll(e, time ,amount ,start) {
    var eAmt = amount / 100
    var curTime = 0;
    var scrollCounter = 0;
    const y = window.scrollY;
    while ( curTime <= time) {
        window.setTimeout(SHS_B, curTime, e, scrollCounter,eAmt,start,y);
        curTime += time / 100;
        scrollCounter++;

    }
    window.scrollTo(0,y);
}

function SHS_B(e,eAmt,sc,start,y){
    e.scrollLeft = eAmt * sc +start
}