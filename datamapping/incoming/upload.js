const IncomingForm = require('formidable').IncomingForm

util = require('util');

module.exports = function upload(req, res) {
    //console.log(req);
    var form = new IncomingForm()
    
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/../uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('<upload.js> Uploaded ' + file.name);
    });

}