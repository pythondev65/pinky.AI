var imagesarray=[];
$(document).ready(function() {
// Jquery for button click



// anything
$("#nameInputModel").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#saveAnything").click();
    }
});
 // business
 
 $("#nameInputModelbusiness").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#savebusinesspitch").click();
    }
});


// nameInputModelproductdesc

$("#nameInputModelproductdesc").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#saveproductdesc").click();
    }
});


// nameInputModeljobdesc

$("#nameInputModeljobdesc").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#savejobsdesc").click();
    }
});

// nameInputModelTweet

$("#nameInputModelTweet").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#savetweetdetail").click();
    }
});


// nameInputcoldmail

$("#nameInputcoldmail").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#savecoldemail").click();
    }
});

// nameInputModelVidIdeass
$("#nameInputModelVidIdeass").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#saveVideoIdeas").click();
    }
});

// nameInputModelVideodesc
$("#nameInputModelVideodesc").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#saveViddescc").click();
    }
});


   
    // codeAddress();ss
    var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');

    $('.profilemodel').hide();
    $('#allsaved').show();
    $('#selectMeprofile').change(function () {
    $('.profilemodel').hide();
      $('#'+$(this).val()).show();
    })

    $('.group').hide();
    $('#Business').show();
    $('#selectMe').change(function () {
    $('.group').hide();
      $('#'+$(this).val()).show();
    })

    $("input[placeholder]").each(function () {
          $(this).attr('size', $(this).attr('placeholder').length);
      });

    //   Tell me anything
    $('#tellmemore').on('click', function(event) {   
      
        $.ajax({
            data:{
                name : $('#generateAnything').val(), 
            },
            type: "POST",
            url: "generate-anything/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
                $('#image').show();
            },
         
            success: function(data){
                $('#image').hide();

                var htmlContent = '';
                if(anything!="")
                {
                    htmlContent = anything+'<br>';
                }   
                htmlContent += data.data;
                $('#anything').html(htmlContent);
                anything=htmlContent;
            },
           
        });
	});

    $('#saveAnything').on('click', function(event) {
        var category='anything';

        $.ajax({
            data:{
                title:$('#nameInputModel').val(),
                query:$('#generateAnything').val(),
                data:$('#anything').html(),
                category:category,
            },
            type:'POST',
            url:"saveanything/",
            headers:{"X-CSRFToken": $crf_token},
            success: function(data){
               $('#exampleModalCenter').modal('hide');
               $('#anything').html('');

               
            },

        });

	});

     // #tell me pitch
     $('#tellmemorebussiness').on('click', function(event) {   
      
        $.ajax({
            data:{
                
                name : $('#businessinput').val(), 
            },
            type: "POST",
            url: "businesspitch-ideas/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
                $('#image').show();
            },
         
            success: function(data){
                $('#image').hide();
                var htmlContent = '';
                if(bussinesspitch!="")
                {
                    htmlContent = bussinesspitch+'<br>';
                }   
                htmlContent += data.data;
                $('#businessidea').html(htmlContent);
                bussinesspitch=htmlContent;
            },
           
        });
	});


    $('#savebusinesspitch').on('click', function(event) {
        var category='businesspitch';
        $.ajax({
            data:{
                title:$('#nameInputModelbusiness').val(),
                query:$('#businessinput').val(),
                data:$('#businessidea').html(),
                category:category
            },
            type:'POST',
            url:"saveanything/",
            headers:{"X-CSRFToken": $crf_token},
            success: function(data){
               $('#businesspitchidea').modal('hide');
               $('#businessidea').html('');


               
            },

        });

	});


// #tell me email

$('#tellmemoremail').on('click', function(event) {   
      
    $.ajax({
        data:{
            name : $('#coldEmails').val(), 
        },
        type: "POST",
        url: "cold-emails/",
        headers:{"X-CSRFToken": $crf_token},
        beforeSend: function(){
            $('#image').show();
        },
     
        success: function(data){
            $('#image').hide();

            var htmlContent = '';
            if(coldemail!="")
            {
                htmlContent = coldemail+'<br>';
            }   
            htmlContent += data.data;
            $('#emailgenrate').html(htmlContent);
            coldemail=htmlContent;
        },
       
    });
});


$('#savecoldemail').on('click', function(event) {
    var category='coldemail';
    $.ajax({
        data:{
            title:$('#nameInputcoldmail').val(),
            query:$('#coldEmails').val(),
            data:$('#emailgenrate').html(),
            category:category
        },
        type:'POST',
        url:"saveanything/",
        headers:{"X-CSRFToken": $crf_token},
        success: function(data){
           $('#emailcoldModel').modal('hide');
           $('#emailgenrate').html('');
           $('#nameInputcoldmail').html('');



           
        },

    });

});


// tell me more product description

$('#tellmemoreProdsc').on('click', function(event) {   
    $.ajax({
        data:{
            name : $('#product').val(), 
        },
        type: "POST",
        url: "product-description/",
        headers:{"X-CSRFToken": $crf_token},
        beforeSend: function(){
            $('#image').show();
        },
     
        success: function(data){
            $('#image').hide();

            var htmlContent = '';
            if(prodesc!="")
            {
                htmlContent = prodesc+'<br>';
            }   
            htmlContent += data.data;
            $('#productDescription').html(htmlContent);
            prodesc=htmlContent;
        },
       
    });
});


$('#saveproductdesc').on('click', function(event) {
    var category='productdesc';
    $.ajax({
        data:{
            title:$('#nameInputModelproductdesc').val(),
            query:$('#product').val(),
            data:$('#productDescription').html(),
            category:category
        },
        type:'POST',
        url:"saveanything/",
        headers:{"X-CSRFToken": $crf_token},
        success: function(data){
           $('#Productdescti').modal('hide');
           $('#nameInputModelproductdesc').html('');
           $('#productDescription').html('');



           
        },

    });

});

// tell me job description

$('#tellmemorejobdesc').on('click', function(event) {   
  $.ajax({
      data:{
          name : $('#jobDescription').val(), 
      },
      type: "POST",
      url: "job-description/",
      headers:{"X-CSRFToken": $crf_token},
      beforeSend: function(){
          $('#image').show();
      },
   
      success: function(data){
          $('#image').hide();

          var htmlContent = '';
          if(jobsdsc!="")
          {
              htmlContent = jobsdsc+'<br>';
          }   
          htmlContent += data.data;
          $('#jobdetail').html(htmlContent);
          jobsdsc=htmlContent;
      },
     
  });
});


$('#savejobsdesc').on('click', function(event) {
    var category='jobdesc';
    $.ajax({
        data:{
            title:$('#nameInputModeljobdesc').val(),
            query:$('#jobDescription').val(),
            data:$('#jobdetail').html(),
            category:category
        },
        type:'POST',
        url:"saveanything/",
        headers:{"X-CSRFToken": $crf_token},
        success: function(data){
           $('#jobDescri').modal('hide');
           $('#nameInputModeljobdesc').html('');
           $('#jobdetail').html('');
          $('#anythingsavesuccess').show();

           



           
        },

    });

});


// tell me more tweets


$('#tellmemorerweets').on('click', function(event) {   
  $.ajax({
      data:{
          name : $('#product').val(), 
      },
      type: "POST",
      url: "tweet-ideas/",
      headers:{"X-CSRFToken": $crf_token},
      beforeSend: function(){
          $('#image').show();
      },
   
      success: function(data){
          $('#image').hide();

          var htmlContent = '';
          if(tweetideass!="")
          {
              htmlContent = tweetideass+'<br>';
          }   
          htmlContent += data.data;
          $('#tweetidea').html(htmlContent);
          tweetideass=htmlContent;
      },
     
  });
});


$('#savetweetdetail').on('click', function(event) {
    var category='tweetdetail';
    $.ajax({
        data:{
            title:$('#nameInputModelTweet').val(),
            query:$('#tweetIdeas').val(),
            data:$('#tweetidea').html(),
            category:category
        },
        type:'POST',
        url:"saveanything/",
        headers:{"X-CSRFToken": $crf_token},
        success: function(data){
           $('#Tweetdetail').modal('hide');
           $('#nameInputModelTweet').html('');
           $('#tweetidea').html('');



           
        },

    });

});

// tell me more video ideas 

$('#tellmemorVidideas').on('click', function(event) {   
  $.ajax({
      data:{
          name : $('#videoIdeas').val(), 
      },
      type: "POST",
      url: "video-ideas/",
      headers:{"X-CSRFToken": $crf_token},
      beforeSend: function(){
          $('#image').show();
      },
   
      success: function(data){
          $('#image').hide();

          var htmlContent = '';
          if(vidideass!="")
          {
              htmlContent = vidideass+'<br>';
          }   
          htmlContent += data.data;
          $('#videodata').html(htmlContent);
          vidideass=htmlContent;
      },
     
  });
});


$('#saveVideoIdeas').on('click', function(event) {
    var category='vidideas';
    $.ajax({
        data:{
            title:$('#nameInputModelVidIdeass').val(),
            query:$('#videoIdeas').val(),
            data:$('#videodata').html(),
            category:category
        },
        type:'POST',
        url:"saveanything/",
        headers:{"X-CSRFToken": $crf_token},
        success: function(data){
           $('#VidIdeasmodel').modal('hide');
           $('#nameInputModelVidIdeass').html('');
           $('#videodata').html('');



           
        },

    });

});

// tell me video description
$('#tellmemorViddesc').on('click', function(event) {   
    $.ajax({
        data:{
            name : $('#videoDescription').val(), 
        },
        type: "POST",
        url: "video-description/",
        headers:{"X-CSRFToken": $crf_token},
        beforeSend: function(){
            $('#image').show();
        },
     
        success: function(data){
            $('#image').hide();
  
            var htmlContent = '';
            if(viddescri!="")
            {
                htmlContent = viddescri+'<br>';
            }   
            htmlContent += data.data;
            $('#viddescription').html(htmlContent);
            viddescri=htmlContent;
        },
       
    });
  });
  
  
  $('#saveViddescc').on('click', function(event) {
      var category='videsc';
      $.ajax({
          data:{
              title:$('#nameInputModelVideodesc').val(),
              query:$('#videoDescription').val(),
              data:$('#viddescription').html(),
              category:category
          },
          type:'POST',
          url:"saveanything/",
          headers:{"X-CSRFToken": $crf_token},
          success: function(data){
             $('#VidDescmodel').modal('hide');
             $('#nameInputModelVideodesc').html('');
             $('#viddescription').html('');
  
  
  
             
          },
  
      });
  
  });




  $('#imagegenrate').on('submit', function(event) {
    $('#successError').hide();
    event.preventDefault();
  
    $.ajax({
        data : {
            name : $('#nameInput').val(),
            digit : $('#digitinput').val(),

            
            
        },
        type : 'POST',
        url : 'process/',
        headers:{"X-CSRFToken": $crf_token},
        error: function(){
            var htmlContent = '<h3>Please Re-Input data again.</h3>';
            $('#successError').html(htmlContent);
           $('#image').hide();
           $('#successError').show();


           return false
        },
        beforeSend: function(){
            $('#image').show();
            $('#successAlert').html('');
            


        },
        success: function(data){
            var htmlContent = '';
            imagesarray=data.data.images
            imgdigit=data.digit
            data.data.images.map((row, index) => {
            
                if(index < imgdigit)
                {
                    imagesarray+='data:image/jpeg;base64,'+row+''
                    // htmlContent += '<div class="succes_img"><a download="FILENAME.png" href="'+'data:image/jpeg;base64,'+row+'  dawnload"><img src="'+'data:image/jpeg;base64,'+row+'"> </a></div>';
                    htmlContent+='<div class="succes_img"><input type="checkbox" value="data:image/jpeg;base64,'+row+'" name="imageselection[]" onChange=buttoncall(this)> <img src="'+'data:image/jpeg;base64,'+row+'"><a download="image.png" href="'+'data:image/jpeg;base64,'+row+'" dawnload><div class="middle"><button type="button">Download Me!</button></div></a></div>'
                }    
            }); 
            $('#successAlert').html(htmlContent);
            $('#image').hide();
            $('#download_all_button').show();
            $('#digitinput').html('');

            

            

            // $('#nameInput').val('');

        },  
        timeout: 240000    
    });

    event.stopImmediatePropagation();
    return false;

});







    $("#productsub").on('submit', function(event) {
        $('#successError').hide();
        event.preventDefault();    
        $.ajax({
            data:{
                name : $('#product').val(), 
            },
            type: "POST",
            url: "product-description/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();


               return false
            },

            beforeSend: function(){
                $('#image').show();
                $('#productDescription').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +='<span class="produ">'+data.data+'</span>'
                $('#productDescription').html(htmlContent);
                $('#image').hide();
                $('#tellmemoreProdsc').show();
                $('#OpenModelProdsc').show();
                $('#nameInputModelproductdesc').val(res);

                prodesc=htmlContent


            },
            timeout: 120000    

        });       
        
    });    

    $("#jobdescri").on('submit', function(event) { 

        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()   
        $.ajax({
            data:{
                name : $('#jobDescription').val(), 
            },
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();


               return false
            },
            type: "POST",
            url: "job-description/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
                $('#image').show();
                $('#jobdetail').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#jobdetail').html(htmlContent);
                $('#image').hide();
                $('#tellmemorejobdesc').show();
                $('#OpenModelJobdsc').show();
                jobsdsc=htmlContent
                $('#nameInputModeljobdesc').val(res);
            },
            timeout: 120000    

        });
        

    });

    $("#anythingsub").on('submit', function(event) { 
        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()   
                
        $.ajax({
            data:{
                name : $('#generateAnything').val(), 
            },
            type: "POST",
            url: "generate-anything/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $("body").attr("class", "blurBg");
            //    $('body').removeClass('blurBg');
       
               $('#successError').show();


               return false
            },
            beforeSend: function(){
                $('#image').show();
                $('#anything').html('');
                // $('body').addClass('blurBg'); 
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#anything').html(htmlContent);
                $('#image').hide();
                anything=htmlContent;
                $('#nameInputModel').val(res);
                $('#tellmemore').show();
                $('#OpenModel').show();

                // $('body').removeClass('blurBg');

            },
            timeout: 120000 
        });
        
        
    });



    $("#tweetideafor").on('submit', function(event) { 
        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()  
            
        $.ajax({
            data:{
                name : $('#tweetIdeas').val(), 
            },
            type: "POST",
            url: "tweet-ideas/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();


               return false
            },
            beforeSend: function(){
                $('#image').show();
                $('#tweetidea').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#tweetidea').html(htmlContent);
                $('#image').hide();
                $('#tellmemorerweets').show();
                $('#OpenModeltweet').show();
                tweetideass=htmlContent
                $('#nameInputModelTweet').val(res);

            },
            timeout:120000

        });
        
        
    });


    $("#emailgenerate").on('submit', function(event) { 
        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()  
            
        $.ajax({
            data:{
                name : $('#coldEmails').val(), 
            },
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();


               return false
            },
            type: "POST",
            url: "cold-emails/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
                $('#image').show();
                $('#emailgenrate').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#emailgenrate').html(htmlContent);
                $('#image').hide();
                $('#tellmemoremail').show();
                $('#OpenModelEmail').show();
                $('#nameInputcoldmail').val(res);
                coldemail=htmlContent


            },
            timeout:120000
        });
        
        

    });


    $("#vidideass").on('submit', function(event) { 
        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()  
        $.ajax({
            data:{
                name : $('#videoIdeas').val(), 
            },
            type: "POST",
            url: "video-ideas/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();


               return false
            },
            beforeSend: function(){
                $('#image').show();
                $('#videodata').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#videodata').html(htmlContent);
                $('#image').hide();
               $('#tellmemorVidideas').show();
               $('#OpenModelVideoIdeas').show();
               $('#nameInputModelVidIdeass').val(res);
               
               vidideass=htmlContent    

            },
            timeout:120000
        });
        
        
    });

    $("#viddescriptionn").on('submit', function(event) { viddescriptionn
        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()  
        $.ajax({
            data:{
                name : $('#videoDescription').val(), 
            },
            type: "POST",
            url: "video-description/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();


               return false
            },
            beforeSend: function(){
                $('#image').show();
                $('#viddescription').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#viddescription').html(htmlContent);
                $('#image').hide();
                $('#tellmemorViddesc').show();
                $('#OpenModelVideodesc').show();
                viddescri=htmlContent
                $('#nameInputModelVideodesc').val(res);

            },
            timeout:120000
        });
        
        
    });

    $("#pitchesbusiness").on('submit', function(event) { 
      
        $('#successError').hide();
        event.preventDefault(); 
        event.stopImmediatePropagation()  
        $.ajax({
            data:{
                name : $('#businessinput').val(), 
            },
            type: "POST",
            url: "businesspitch-ideas/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                var htmlContent = '<h3>Please Re-Input data again.</h3>';
                $('#successError').html(htmlContent);
               $('#image').hide();
               $('#successError').show();
               return false
            },
            beforeSend: function(){
                $('#image').show();
                $('#businessidea').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#businessidea').html(htmlContent);
                bussinesspitch=htmlContent
                $('#image').hide();
                $('#tellmemorebussiness').show();
                $('#OpenModelBussiness').show();
                $('#nameInputModelbusiness').val(res);

            },
            timeout:120000
        });
        
        
    });

    $('#tellmemore').on('click', function(event) {   
      
        $.ajax({
            data:{
                name : $('#generateAnything').val(), 
            },
            type: "POST",
            url: "newhome/fetchalldata/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
                $('#image').show();
            },
         
            success: function(data){
                
            },
           
        });
	});
    

    

 
});



function download_all(){
    var checkboxes = document.getElementsByName('imageselection[]');
    console.log(checkboxes)
    var totalChecked = $('input[name="imageselection[]"]:checked').length;
    
    console.log("value ==> ", totalChecked)
    var vals = [];
    for (var i=0, n=checkboxes.length;i<n;i++) 
    {
        if ((totalChecked > 0 && checkboxes[i].checked) || totalChecked == 0) 
        {
            const downloadLink = document.createElement("a");
            downloadLink.href = checkboxes[i].value;
            downloadLink.download = 'image';
            downloadLink.click();
        }
    }    
}


function buttoncall(image){
    var totalChecked = $('input[name="imageselection[]"]:checked').length;

    console.log("get image==>>>",totalChecked)
    if (totalChecked==0 ){
        $('#download_all_button').show();
        $('#download_all_selected').hide();
    }
    else{
        $('#download_all_selected').show();  
        $('#download_all_button').hide();

    }
   
}

function fetchany(th){

    var $crf_token = $('#generateany > [name="csrfmiddlewaretoken"]').attr('value');
   

    if (th=="generateany"){
        category="anything"
        
        var fetchdata='anythingfetch';
    }else if(th=="pitchideass"){
        
        category="businesspitch"
        var fetchdata='businesspitchfetch';
    }else if(th=="email"){
        category="coldemail"
        var fetchdata="emailfetch";

    }else if(th=="jobdesc"){
        category="jobdesc"
        var fetchdata="jobdescri";

    }else if(th=="tweet"){
        category="tweetdetail"
        var fetchdata="tweetfetch";
    

    }else if(th=="Videsc"){
        category="videsc"
        var fetchdata="fetchvidedesc";

    }else if(th=="Videas"){
        category="vidideas"
        var fetchdata="fetchvidideass";
    }else if(th=="newhome"){
        category="newcustomecatagory"
        var fetchdata="newhomedata";
    }else if(th=="productcription"){
        category="productdesc"
        var fetchdata="fetchprodsc"; 
    }
    else{
        $.ajax({
            data:{
                name : $('#generateAnything').val(), 
                
        
            },
            type: "GET",
            url: "newhome/fetchalldata/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
              
            },
         
            success: function(data){
                var htmlContent = '';
                // htmlContent +=data.msg
                var increment = 1;
                data.msg.map((row) => {
                    htmlContent += `<tr>
                    <th scope="row" >`+increment+`</th>
                    <td>`+row.title+`</td>
                    <td>`+row.query+`</td>
                    <td>`+row.data+`</td>
                    <td>`+row.category+`</td>

                  </tr>`;
                  increment++;
                });
                $('#fetchalldata').html(htmlContent);

                
            },
           
        });

       
    }

    htmlContent=''
        $.ajax({
            data:{
                name : $('#generateAnything').val(), 
                category:category,

            
            },
            type: "GET",
            url: "fetchanything-data/",
            headers:{"X-CSRFToken": $crf_token},
            beforeSend: function(){
              
            },
         
            success: function(data){
                var htmlContent = '';
                // htmlContent +=data.msg
                var increment = 1;
                data.msg.map((row) => {
                    htmlContent += `<tr>
                    <th scope="row" >`+increment+`</th>
                    <td>`+row.title+`</td>
                    <td>`+row.query+`</td>
                    <td>`+row.data+`</td>
                  </tr>`;
                  increment++;
                });
                $('#'+fetchdata).html(htmlContent);

                
            },
           
        });
}
 















