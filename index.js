function prosessInput() {
    var code = document.getElementById("input").value;
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
        document.getElementById('output').contentWindow.scrollTo(0,10000000);
    }
}
