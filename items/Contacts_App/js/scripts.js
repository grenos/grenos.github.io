document.getElementById('form').addEventListener('submit', saveInputs); // get submit event
var filter = document.getElementById('js-search').addEventListener('keyup', filterNames); //get search contacts field

var modal = document.getElementById('js-card-modal');  // get outer modal div
window.addEventListener('click', clickOutside); // listen for click on window element

var confirmDel = document.getElementById('js-confirmDelete');  // get outer confirm delete div
var deleteBtn = document.getElementById('js-delete-btn');
var cancelBtn = document.getElementById('js-cancel-btn').addEventListener('click', cancelDel); 


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
    
    var contactCard = { // put input values in an object
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
        
    if(localStorage.getItem('contacts') !== null){ // avoids error if array is empty
        contacts.sort(function(a, b){  // sort objects in array alphbetically
            if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
            if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            return 0;
        })    
    }
    
    for (var i = 0; i < contacts.length; i++ ) {  // loop through the contacts array
        var name = contacts[i].name; // and get the values from each input in a var
        var surname = contacts[i].surname;
        var homeNo = contacts[i].homeNo;
        var mobileNo = contacts[i].mobileNo;
        var email = contacts[i].email;
        var uniqueId = contacts[i].id;
       
        contactsPrint.innerHTML +=  // print list to DOM
            '<ul class="collection">'+
                '<li class="collection-item">'+
                    '<a onclick="openModal(\''+uniqueId+'\')" href="#">'+name+' '+surname+'</a>'+
                    '<a onclick="openDelete(\''+uniqueId+'\')" href="#" class="secondary-content"><i class="material-icons icon-grey">delete</i></a>'+
                    '<a href="mailto:'+email+'\'?Subject=Hello!" target="_top" class="secondary-content" ><i class="material-icons icon-grey">email</i></a>'+
                    '<a href="tel:'+mobileNo+'" class="secondary-content" ><i class="material-icons icon-grey">phone_iphone</i></a>'+
                    '<a href="tel:'+homeNo+'" class="secondary-content" ><i class="material-icons icon-grey">phone</i></a>'+    
                '</li>'+
            '</ul>'; 
    }
   
}

function printCard (uniqueId){ // print contact card in modal
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    
    for (var i = 0; i < contacts.length; i++ ) { //loop the array
        if (contacts[i].id === uniqueId){ // find matched id with clicked
        
            var printCardDetails = document.getElementById('js-card-open'); // get card element 
            
            printCardDetails.innerHTML =  // print on DOM
                '<div class="card">'+
                    '<div class="card-image">'+
                        '<img src="img/placeholder" name="canvas">'+
                        '<span class="card-title">'+contacts[i].name+' '+contacts[i].surname+'</span>'+
                    '</div>'+    
                    '<div class="card-content">'+
                        '<a href="tel:'+contacts[i].homeNo+'" class="waves-effect waves-light"><i class="material-icons right">phone</i></a>'+         
                        '<a href="tel:'+contacts[i].mobileNo+'" class="waves-effect waves-light"><i class="material-icons right">phone_iphone</i></a>'+
                        '<a href="mailto:'+contacts[i].email+'?Subject=Hello!" target="_top" class="waves-effect waves-light"><i class="material-icons right">email</i></a>'+
                        '<a onclick="openDelete(\''+uniqueId+'\')" class="waves-effect waves-light"><i class="material-icons right">delete</i></a>'+
                
                        '<a href="https://www.instagram.com/explore/people/\''+contacts[i].name+contacts[i].surname+'"\' target="_blank" class="waves-effect waves-light secondary-content"><img src="icons/Insta_icon.png"</a>'+
                
                        '<a href="https://www.facebook.com/search/top/?q=\''+contacts[i].name+contacts[i].surname+'"\' target="_blank" class="waves-effect waves-light secondary-content"><img src="icons/f_icon.png""</a></a>'+
                
                        '<ul class="collection collection-card-item">'+
                            '<li class="collection-item inner-card-item">Home Number:<span class="card-details">'+contacts[i].homeNo+'</span></li>'+
                            '<li class="collection-item inner-card-item">Mobile Number:<span class="card-details">'+contacts[i].mobileNo+'</span></li>'+
                            '<li class="collection-item inner-card-item">Email:<span class="card-details">'+contacts[i].email+'</span></li>'+
                        '</ul>'+
                    '</div>'+
                '</div>';
        }
    }
    randomImg(); // call random picture function
}

placeholders = [  // array of pics
    'img/placeholder.jpg', 
    'img/placeholder2.jpg', 
    'img/placeholder3.jpg', 
    'img/placeholder4.jpg', 
    'img/placeholder5.jpg', 
];

function randomImg (){ //assign random number to pics
    var num = Math.floor(Math.random() * 5);
    document.canvas.src = placeholders[num]; // display on card
    }
    

function  openDelete(){ // open confirm delete modal
    confirmDel.style.display = 'block';  
}

confirmDel.addEventListener('click', function(){
    var contacts = JSON.parse(localStorage.getItem('contacts')); // get JSON
    for (var i = 0; i < contacts.length; i++ ) {  // loop through the contacts array
        var uniqueId = contacts[i].id;
    }  
    deleteContact(uniqueId);
})

function cancelDel(){ // hide confirm delete modal
    confirmDel.style.display = 'none';
}


function deleteContact(uniqueId) { // delete contact on icon click
    var contacts = JSON.parse(localStorage.getItem('contacts')); // get JSON
    
    for (var i = 0; i < contacts.length; i++ ) {  // loop through the contacts array
        if (contacts[i].id == uniqueId){ // match the delete click with the correct object
            contacts.splice(i, 1); // remove object from array
        }
        if ( modal.style.display = 'block'){ // if delete from modal card
            modal.style.display = 'none';  // delete the modal card also
        }
        if ( confirmDel.style.display = 'block'){   
            confirmDel.style.display = 'none';
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
            //setTimeout(filterNames, 5);
            
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


function openModal (uniqueId){ //open modal
    modal.style.display = 'block'; // set it to visible
    printCard(uniqueId); // call the function to print the modal card on DOM
}


function clickOutside (e){   // if click outside card close it
    if(e.target === modal){
        modal.style.display = 'none';
    }    
}


