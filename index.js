function prosessInput(code = null, is_file = false) {
    is_debug = document.getElementById("debug_mode").checked;
    if (!code)
        code = document.getElementById("input").value;
    document.getElementById("input").value = "";
    var framedoc = document.getElementById('output').contentWindow.document;

    var input = framedoc.createElement('p');
    input.classList += ['input'];

    input.innerHTML = code;
    framedoc.getElementById("container").appendChild(input);

    var output = framedoc.createElement('p');
    try {
        var result = eval(code);
        output.innerHTML = result;
        output.classList += ['output'];
        framedoc.getElementById("container").appendChild(output);
    } catch (exc) {
        if (is_debug) {
            output.innerHTML = exc;
            output.innerHTML += "; for variable scope see console.log";
            for (let variable in window) {
                if (window.hasOwnProperty(variable)) {
                    console.log(variable);
                }
            }
        } else output.innerHTML = "unknown error, use debug mode for more informative";
        output.classList += ['error'];
        framedoc.getElementById("container").appendChild(output);
    } finally {
        document.getElementById('output').contentWindow.scrollTo(0, 10000000);
    }
}


function processFile() {
    var files_chunk = document.getElementById("browse");
    var popup_txt = "";
    if ('files' in files_chunk) {
        if (files_chunk.files.length == 0) {
            popup_txt = "Select one or more files.";
        } else {
            for (var i = 0; i < files_chunk.files.length; i++) {
                var file = files_chunk.files[i];
                if (file.name.split('.').pop() != 'js') {
                    popup_txt += file.name + " is wrong extension, skip";
                    continue;
                }

                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    prosessInput(evt.target.result, true);
                }
                reader.onerror = function (evt) {
                    popup_txt = "couldn't read file's content, check encoding.";

                }
            }
        }
    } else {
        if (files_chunk.value == "") {
            popup_txt = "Select one or more files.";
        } else {
            popup_txt = "The files property is not supported by your browser!";
            popup_txt += "<br>The path of the selected file: " + files_chunk.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    if (popup_txt) alert(popup_txt);
}
