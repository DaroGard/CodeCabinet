var htmContent = ``;
var cssContent = ``;
var jsContent = ``;
var htmlEditor = '';
var cssEditor = '';
var jsEditor = '';
var htmlCode = localStorage.getItem('html_code') || '';
var cssCode = localStorage.getItem('css_code') || '';
var jsCode = localStorage.getItem('js_code') || '';
var selectedUser = localStorage.getItem('id');
htmContent = htmlCode;
cssContent = cssCode;
jsContent = jsCode;
let htmlText;
let cssText;
let jsText;
var LMT = localStorage.getItem('LIMIT') ;
var MAX = localStorage.getItem('MAX');
var folderID = localStorage.getItem('folderId');

htmlEditor = CodeMirror(document.querySelector(".editor .code .html-code"), {
  lineNumbers: true,
  tabSize: 4,
  mode: "xml"
});

cssEditor = CodeMirror(document.querySelector(".editor .code .css-code"), {
  lineNumbers: true,
  tabSize: 4,
  mode: "css"
});

jsEditor = CodeMirror(document.querySelector(".editor .code .js-code"), {
  lineNumbers: true,
  tabSize: 4,
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

function downloadCode(){
    var zip = new JSZip();
    var elementTitle = document.getElementById("title");
    var text = elementTitle.innerText;
    htmlText = htmlEditor.getValue();
    cssText = cssEditor.getValue();
    jsText = jsEditor.getValue();

    zip.file('index.html',  htmlText);
    zip.file('assets/styles.css', cssText);
    zip.file('assets/script.js', jsText);
  

    zip.generateAsync({ type: 'blob' }).then(function (blob) {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');

      a.href = url;
      a.download = `${text}.zip`;
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
};

const addFolder = async() => {
  html = htmlEditor.getValue();
  css =  cssEditor.getValue();
  js = jsEditor.getValue();
  var elementTitle = document.getElementById("title");
  var text = elementTitle.innerText;

  if(folderID == null){
    if(MAX < LMT){
      title = `${text}`;

      const resultado = await fetch(`http://localhost:8888/users/${selectedUser}`, {
          method: 'GET'
      });
  
      usuario = await resultado.json();
  
      const user = {
        _id: `${selectedUser}`,
        username: `${usuario.username}`
      };
  
      const folderData = {
        user,
        title,
        inside: [
          { html },
          { css },
          { js }
        ]
      };
  
      fetch('http://localhost:8888/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(folderData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      alert('You have reached the limit of your plan');
    }
  } else {
    var newData = {
      title: text,   
      inside: [
      { html },
      { css },
      { js }
    ] };

    const apiUrl = 'http://localhost:8888/folders/' + folderID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updatedFolder => {
        console.log('Updated folder:', updatedFolder);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });
  }
    
  };

  function returnMain(){
    window.location.href = 'main.html';
  };


  const titleText = async(id) => {
  
    const resultado = await fetch(`http://localhost:8888/folders/${folderID}`, {
      method: 'GET'
    });
    
  folder = await resultado.json();
  document.getElementById("title").innerHTML = `${folder.title}`;

};

titleText();