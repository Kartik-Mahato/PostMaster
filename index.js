let addedParamsCount = 0;

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// hide tthe parameters box initially
const parametersBox = document.getElementById("parametersBox");
const requestJsonBox = document.getElementById("requestJsonBox");
parametersBox.style.display = 'none';

// if the user clicks on params, hide the json box
const paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener("click", () => {
    requestJsonBox.style.display = 'none';
    parametersBox.style.display = 'block';
});

// if the user clicks on json, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    parametersBox.style.display = 'none';
    requestJsonBox.style.display = 'block';
});

// adding more custom parameters field on button click
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    addedParamsCount += 1;
    let params = document.getElementById("params");
    let string = `
                    <div class="row  my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 1}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addedParamsCount + 1}" placeholder="Enter parameter ${addedParamsCount + 1} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${addedParamsCount + 1}" placeholder="Enter parameter ${addedParamsCount + 1} value">
                        </div>
                        <button class="btn btn-primary col-sm-1 removeParam">-</button>
                    </div>
    `
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);

    //delete parameter on button click
    let deleteParam = document.getElementsByClassName('removeParam');
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }

});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("responsePrism").value = "Please Wait..."

    let url = document.getElementById("inputURL").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    // console.log(requestType);
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType === 'params') {
        var data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            // console.log(addedParamsCount);

            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
                // console.log(data);
            }

            data = JSON.stringify(data);

        }
    } else {
        data = JSON.stringify(document.getElementById("requestJsonText").value);
    }

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => {
                return response.text();
            })
            .then(text => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll();
            })
    } else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => {
                console.log(response);

                return response.text();
            })
            .then(text => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll();
            })
    }


});