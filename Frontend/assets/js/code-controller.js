const htmlEditor = CodeMirror(document.querySelector(".editor .code .html-code"), {
    lineNumbers:true,
    tabSize:4,
    mode: "xml"
});

const cssEditor = CodeMirror(document.querySelector(".editor .code .css-code"), {
    lineNumbers:true,
    tabSize:4,
    mode: "css"
});

const jsEditor = CodeMirror(document.querySelector(".editor .code .js-code"), {
    lineNumbers:true,
    tabSize:4,
    mode: "javascript"
});

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

    console.log('Html: ',htmlCleanSave);
    console.log('Css: ',csscleanSave);
    console.log('Js: ',jscleanSave);

}