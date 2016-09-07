var express = require('express');
var router = express.Router();

/* Read data from json file */
var fs = require('fs'),json;

function readJsonFileSync(filepath,encoding){
    if(typeof(encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath,encoding);
    return JSON.parse(file);
}

function getConfig(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

var jsonData = getConfig('data.json');
var personalData = jsonData.personalData;
var experienceData = jsonData.experienceData;
var educationData = jsonData.educationData;
var projectData = jsonData.projectData;
var travelData = jsonData.travelData;
var cookData = jsonData.cookData;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {person:personalData,experience:experienceData,education:educationData,project:projectData,travel:travelData,cooking:cookData});
});

module.exports = router;