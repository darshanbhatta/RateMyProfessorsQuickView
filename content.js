var clickedEl = null;
var url = chrome.extension.getURL('/img/tag.png');


$(document).ready(function(){
    $.protip();

});

document.addEventListener("mousedown", function (event) {
    //right click
    if (event.button == 2) {
        clickedEl = event.target;
    }
}, true);





chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {

    if (request.method == 'gotName') {

        console.log(request.data);

        if(request.data.error===undefined){

            try{
                $(clickedEl).tooltipster('destroy');
            }catch(e){
                console.log(e);
            }
    
            var builder=``;
        
                console.log();
                for(var i in request.data.tags){
                    builder+=`<div class="tagelementss" style="margin-left:10px;"><span class="tagTextt">${request.data.tags[i]}</span></div> `;
                }
               
            
            console.log(builder);
    
            var reviewTitle;
            var reviewBody;
            var reviewDate;
    
            if(request.data.ratingList.ratings.length>0){
                reviewTitle = request.data.ratingList.ratings[0].rClass;
                reviewBody = request.data.ratingList.ratings[0].rComments;
                reviewDate =  request.data.ratingList.ratings[0].rDate;
            }else{
                reviewTitle = "N/A";
                reviewBody = "N/A";
                reviewDate = "N/A";
            }
    
            var button = ``
            if(request.data.multi>1){
            
                button = `<button class="errorrr" onclick=" window.open('${request.data.searchURL}','_blank')">${request.data.multi} Entries</button>`
            }
           
            
            $(clickedEl).protipShow({title: `<div class="containerrrrr"> <div title="Click the extension to change the college" class="unicontt">
            <span style="font-size:14px;font-weight: 600;">Selected College:</span>
            <span style="font-size:14px;">${request.uni}</span>
        </div><div class="headerr"> ${button}<span class="namee">${request.data.name}</span><div class="descc"><span style="margin-bottom:5px">${request.data.title}</span> </div> <div class="desccc"><span>${request.data.uni}</span></div> </div> <div class="ratingss"><span class="centerTextt">Overall</span> <div class="circlee"><span class="text_circlee">${request.data.overallQuality}</span></div> </div> <div class="ratingss"><span class="centerTextt">Take Again</span> <div class="circlee"><span class="text_circlee">${request.data.wouldTakeAgain}</span></div> </div> <div class="ratingss"><span class="centerTextt">Difficulty</span> <div class="circlee"><span class="text_circlee">${request.data.difficulty}</span></div> </div> <div class="tagss"> <span class="headersSmalll">Tags</span> <div class="smallCardBoxx"> 
            ${builder}</div> <div class="reviewss"> <span class="headersSmalll" >First Review</span> <div class="smallCardBoxx"> <div class="reviewTitlee"> 
            <span>${reviewTitle}</span> </div> <div class="dateTitlee"> <span>${reviewDate}</span> </div> <div class="reviewTextt"> 
            <span>${reviewBody}</span> 
            </div> </div> <div class="centeraaa"><button class="erroraa" onclick=" window.open('${request.data.url}','_blank')">Detailed View</button><img src=${url} alt="Rate My Professor Tag"> </div> </div>`,     interactive: true
        });
    
        
        }else{

            $(clickedEl).protipShow({title:`<div class="containerrtrr" style="text-align:center;">
           <div title="Click the extension to change the college" class="unicontt">
               <span style="font-size:14px;font-weight: 600;">Selected College:</span>
               <span style="font-size:14px;">${request.uni}</span>
           </div>
                    
           <div>
                   <span>No Professor Found</span>
           </div>
            
           
           <div class="centeraaa">
               <button class="erroraa" onclick=" window.open('${request.data.searchURL}','_blank')">Detailed View</button>
               <img src="${url}" alt="Rate My Professor Tag">
           
           </div>
              
           
               </div>`,interactive: true});

        }

     

/*
        $(clickedEl).tooltipster({
            delay: 10,
            maxWidth: 280,
            // autoClose: false,
            interactive: true,
            content: $(`<div class="header">${request.name}<span class="name"></span> <button class="error">Multi. Entries</button> <div class="desc"> <span>Professor in the Computer Science department</span> <span>University of Texas at Austin</span> </div> </div> <div class="ratings"><span class="centerText">Overall</span> <div class="circle"><span class="text_circle">4.0</span></div> </div> <div class="ratings"><span class="centerText">Take Again</span> <div class="circle"><span class="text_circle">4.0</span></div> </div> <div class="ratings"><span class="centerText">Difficulty</span> <div class="circle"><span class="text_circle">4.0</span></div> </div> <span class="headersSmall">Tags</span> <div class="smallCardBox"> <div class="tagelements" style="margin-left:10px;"><span class="tagText">AMAZING LECTURES (4)</span></div> <div class="tagelements"><span class="tagText">4)dssdsd</span></div> </div> <span class="headersSmall" >First Review</span> <div class="smallCardBox"> <div class="reviewTitle"> <span>AWESOME - CS398L</span> <span>08/06/2017</span> </div> <span>Great instructor, reasonable workload, and very interesting topic. Lectures were easy to follow and well organized. I definitely recommend his courses!</span> </div> <button class="error">Detailed View</button>`),
        }).tooltipster('show');
        */
        console.log("shown" + clickedEl);
    }

});