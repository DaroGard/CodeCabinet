var htmContent = ``;
var cssContent = ``;
var jsContent = ``;
var htmlEditor = '';
var cssEditor = '';
var jsEditor = '';
var htmlCode = localStorage.getItem('html_code') || '';
var cssCode = localStorage.getItem('css_code') || '';
var jsCode = localStorage.getItem('js_code') || '';
htmContent = htmlCode;
cssContent = cssCode;
jsContent = jsCode;


htmlEditor = CodeMirror(document.querySelector(".editor .code .html-code"), {
    lineNumbers:true,
    tabSize:4,
    mode: "xml"
});

cssEditor = CodeMirror(document.querySelector(".editor .code .css-code"), {
    lineNumbers:true,
    tabSize:4,
    mode: "css"
});

jsEditor = CodeMirror(document.querySelector(".editor .code .js-code"), {
    lineNumbers:true,
    tabSize:4,
    mode: "javascript"
});

function loadCode(editor, content) {  
    editor.setValue(content);
}    

loadCode(htmlEditor, htmContent);
loadCode(cssEditor, cssContent);
loadCode(jsEditor, jsContent);

document.querySelector("#run-btn").addEventListener("click", function(){
    let htmlCode = htmlEditor.getValue();
    let cssCode = "<style>" + cssEditor.getValue() + "</style>"
    let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" + "pt>";
    let previewWindow = document.querySelector("#preview-window").contentWindow.document;
    previewWindow.open();
    previewWindow.write(htmlCode+cssCode+jsCode);
    previewWindow.close();
});


function savecontent(){
    htmlContent = document.querySelector(".editor .code .html-code");
    htmlText = htmlContent.textContent;
    htmlCleanSave = htmlText.replace(/[x1]/g, '');

    cssContent = document.querySelector(".editor .code .css-code");
    cssText = cssContent.textContent;
    csscleanSave = cssText.replace(/[x1]/g, '');

    jsContent = document.querySelector(".editor .code .js-code");
    jsText = jsContent.textContent;
    jscleanSave = jsText.replace(/[x1]/g, '');
}

function downloadCode(){
    var zip = new JSZip();
    htmlContent = document.querySelector(".editor .code .html-code");
    htmlText = htmlContent.textContent;
    htmlCleanSave = htmlText.replace(/[x1]/g, '');

    cssContent = document.querySelector(".editor .code .css-code");
    cssText = cssContent.textContent;
    csscleanSave = cssText.replace(/[x1]/g, '');

    jsContent = document.querySelector(".editor .code .js-code");
    jsText = jsContent.textContent;
    jscleanSave = jsText.replace(/[x1]/g, '');
  
    zip.file('index.html',  htmlCleanSave);
    zip.file('assets/styles.css', csscleanSave);
    zip.file('assets/script.js', jscleanSave);
  

    zip.generateAsync({ type: 'blob' }).then(function (blob) {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');

      a.href = url;
      a.download = 'codigo.zip';
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
};