/*
              _ _ _     
 ___ _ __ ___| (_) |__  
/ __| '__/ __| | | '_ \ 
\__ \ | | (__| | | |_) |
|___/_|  \___|_|_|_.__/ 
                        
created by james wilson
created for web design class, to add a show source button to the page to allow user to view the source code of the page

v0.1 beta

*/

document.addEventListener("DOMContentLoaded", function (event) {
    // add HLJS to the page
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js";
    script.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(script);
    var script2 = document.createElement('link');
    script2.rel = "stylesheet";
    script2.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css";
    document.getElementsByTagName('head')[0].appendChild(script2);

    // create a new button and position in the lower left of the screen
    var button = document.createElement("button");
    button.innerHTML = "View Source";
    button.style.position = "fixed";
    button.style.left = "1%";
    button.style.bottom = "1%";
    button.style.zIndex = "9999";
    button.style.backgroundColor = "rgba(0,0,0,0.5)";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "10px";
    button.style.fontSize = "16px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    button.setAttribute("data-state", "hidden");
    button.id = "srclib-button";
    button.onclick = function () {
        if (this.getAttribute("data-state") == "hidden") {
            // show the source code for the page
            var div = document.createElement("div");
            div.style.position = "fixed";
            div.id = "srclib-div";
            // take up whole screen
            div.style.top = "0";
            div.style.left = "0";
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.backgroundColor = "#f3f3f3";
            div.style.zIndex = "999";
            this.innerHTML = "Close Source";
            var doc = document.createElement("pre");
            var code = document.createElement("code");
            doc.style.height = "100%";
            doc.style.width = "100%";
            code.style.height = "100%";
            code.style.width = "100%";
            code.className = "language-html";
            // remove all type = "hidden" elements
            var encodedStr = document.documentElement.outerHTML.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
                return '&#' + i.charCodeAt(0) + ';';
            });

            code.innerHTML = encodedStr;
            doc.appendChild(code);
            div.appendChild(doc);
            document.body.appendChild(div);
            hljs.highlightAll();
            this.setAttribute("data-state", "visible");
        } else {
            // hide the source code for the page
            var div = document.getElementById("srclib-div");
            document.body.removeChild(div);
            this.innerHTML = "View Source";
            this.setAttribute("data-state", "hidden");
        }
    };
    document.body.appendChild(button);
});