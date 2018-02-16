document.getElementById('form').addEventListener('submit', saveInputs); // get submit event
var filter = document.getElementById('js-search').addEventListener('keyup', filterNames); //get search contacts field

var modal = document.getElementById('js-card-modal');  // get outer modal div
window.addEventListener('click', clickOutside); // listen for click on window element


function saveInputs(e){ // save to local storage function
    e.preventDefault(); // prevent default page submit
    
    var fName = document.getElementById('first_name').value; // get values of inputs
    var lName = document.getElementById('last_name').value;
    var home = document.getElementById('home_number').value;
    var mobile = document.getElementById('mobile_number').value;
    var email = document.getElementById('email').value;
    
    var id = Math.random().toString(16).slice(2); // generate a unique id for each object
    
    if(!validateForm(fName, lName)){ // if input does not validate call function
        return false;
    }
    var contactCard = {}
    contactCard[id] = {
	   "name": fName,
	   "surname": lName,
	   "homeNo": home,
	   "mobileNo": mobile,
	   "email": email,
	   "id": id
    }
 
    if(localStorage.getItem('contacts') === null){  // if local storage is empty 
        var contacts = [];   // init array 
        contacts.push(contactCard); // and push each object inside it
        localStorage.setItem('contacts', JSON.stringify(contacts));  // make array a string and save it to local storage 
    }else{  // if local storage has already saved contacts
        var contacts = JSON.parse(localStorage.getItem('contacts'));// convert contact back to JSON object and get them from local storage
        contacts.push(contactCard); // add new contact card to array
        localStorage.setItem('contacts', JSON.stringify(contacts)); // put back to local storage 
    }
    fetchContacts(); // call function to write contacts on DOM
    document.getElementById('form').reset();  // Clear form
}


function fetchContacts() { // write contacts on DOM function  
    var contacts = JSON.parse(localStorage.getItem('contacts')); // get array from local storage
    
    var contactsPrint = document.getElementById('js-contactsPrint'); // get main list element 
    contactsPrint.innerHTML = ''; // set it to empty initialy 
        
//    if(localStorage.getItem('contacts') !== null){ // avoids error if array is empty
//        contacts.sort(function(a, b){  // sort objects in array alphbetically
//            if(a.name < b.name) return -1; 
//            if(a.name > b.name) return 1;
//            return 0;
//        })    
//    }
    
    contacts.forEach(function(element){
        element.name = name;
        element.surname
        element.homeNo
        element.mobileNo
        element.email
        element.id
        
        contactsPrint.innerHTML +=  // print list to DOM
            '<ul class="collection">'+
                '<li class="collection-item">'+
                    '<a onclick="openModal()" href="#">'+name+' '+surname+'</a>'+
                    '<a onclick="deleteContact(\''+uniqueId+'\')" href="#" class="secondary-content"><i class="material-icons icon-grey">delete</i></a>'+
                    '<a href="mailto:\''+email+'\'?Subject=Hello!" target="_top" class="secondary-content" ><i class="material-icons icon-grey">email</i></a>'+
                    '<a href="tel:\''+mobileNo+'\'" class="secondary-content" ><i class="material-icons icon-grey">phone_iphone</i></a>'+
                    '<a href="tel:\''+homeNo+'\'"" class="secondary-content" ><i class="material-icons icon-grey">phone</i></a>'+    
                '</li>'+
            '</ul>'; 
    })
   
}


/////// ******* THIS THING DOESNT WORK *******

//function printCard (objectId){
//    var contacts = JSON.parse(localStorage.getItem('contacts'))[contacts.objectId]; // get array from local storage
//    console.log(contacts);
//
//}
    

function deleteContact(uniqueId) { // delete contact on icon click
    var contacts = JSON.parse(localStorage.getItem('contacts')); // get JSON

    for (var i = 0; i < contacts.length; i++ ) {  // loop through the contacts array
        if (contacts[i].id == uniqueId){ // match the delete click with the correct object
            contacts.splice(i, 1); // remove object from array
        }
    }
    
    localStorage.setItem('contacts', JSON.stringify(contacts)); // put back to local storage 
    
    fetchContacts(); // re preint on DOM
}


function filterNames () { // search through contacts
    var filterValue = document.getElementById('js-search').value.toUpperCase(); // get value of input 

    var list = document.getElementById('js-contactsPrint'); //get the entire list
    var ul = list.querySelectorAll('ul.collection'); //get ul from list
        
        for(var i = 0; i < ul.length; i++){ //loop through collection items
            var a = ul[i].getElementsByTagName('a')[0]; //get links inside of li items

            if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1 ){ // if any of the letters match to the input value
                ul[i].style.display = ''; // do nothing 
            }else{
                ul[i].style.display = 'none'; // make unmatched ul disapear
            }
        }   
}    


function validateForm (fName, lName) { // validate form
    
    if(!fName && lName || fName && !lName || fName && lName){  // if one of the (name, surname) inputs is filled or both
         return true; // submit form
    }
    alert('Please fill in the form');
        return false; // else dont submit
}


function openModal (){ //open modal
    modal.style.display = 'block';
    //printCard(objectId);
}


function clickOutside (e){    
    if(e.target === modal){
        modal.style.display = 'none';
    }    
}


// get first character of each name or surname 
// https://www.w3schools.com/jsref/jsref_charat.asp








