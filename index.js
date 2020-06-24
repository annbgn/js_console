function prosessInput(code = null, is_file = false) {
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
        output.innerHTML = exc;
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
                let reader = new FileReader();
                let code = reader.readAsText(file);
                prosessInput(code, true);
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
    alert(popup_txt);
}
