/* global got */
/* global fs */
const searchBaseURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&";
const objectBaseURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var fs = require("fs");
var got = require('got');

function fetchSearchData(searchTerm) {
 
    let url = encodeURI(searchBaseURL + "q=" + searchTerm);
    console.log(url);

    async function getData() {
        try{
  
  	            const response = await got(url);
  	            console.log(response);
        		let data = JSON.parse(response.body);
                loadObject(data.objectIDs);
        	
    }
    catch (error) {
        console.log(error);
    }
    }
 getData();

}

function loadObject(objectIDs) {
    var objectArray = [];
    var index = 0;
    var count = objectIDs.length;
    async function getData(url) {
            try{
      	            const response = await got(url);
            		console.log(response);
            		let data = JSON.parse(response.body);
            		objectArray.push(data);
            		index++;
            		if (index < count) {
            		    let url = encodeURI(objectBaseURL + objectIDs[index]);
            		    setTimeout(() => {  getData(url); }, 1000);
            		} else {
            		    fs.writeFileSync('./pc_object.json', JSON.stringify (objectArray), 'utf8');
            		    console.log("all finished: " + index);
            		}
            	}
            catch (error) {
                console.log(error);
                setTimeout(() => {  getData(url); }, 60000);
                //fs.writeFileSync('./vg_object.json', JSON.stringify (objectArray), 'utf8');
            }
    }
    
    let url = encodeURI(objectBaseURL + objectIDs[0]);
    getData(url);
}
const search = "Paul Cezanne";
fetchSearchData(search, 0);
