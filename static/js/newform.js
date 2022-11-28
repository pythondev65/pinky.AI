$( document ).ready(function() {

    $("#inputcontent").val("");


   
    var $crf_token = $('#newhome > [name="csrfmiddlewaretoken"]').attr('value');

    $("#nameInputnewhome").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#savenewhomedetail").click();
        }
    });


// Press Enter button 
    $("#inputcontent").keydown(function(event) {
        if ($('#takenBefore').is(':checked')) {
            console.log("Checked ==> ");
            if(event.which == 13) {   
                $("#new_home_btn").click();
            }
        }  
        else{
            console.log("unchecked ==> ");
        }  
    });

  
   

    

    $('#tellmemoremail_newhome').on('click', function(event) {   
        $.ajax({
            data:{
                name : $('#inputcontent').val(), 
                title : $('#drop_down').val(), 


            },
            type: "POST",
            url: "anything-generate/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
       
            },
            beforeSend: function(){
                $('#imageshow').show();

                
            },
            success: function(data){
                var htmlContent = '';
                if(newhome!="")
                {
                    htmlContent = newhome+'<br>';
                }   
                htmlContent += data.data;
                $('#datadisplay').html(htmlContent);
                newhome=htmlContent;
                $('#imageshow').hide();

            },
            timeout:120000
        });
	});



    
  

    $('#savenewhomedetail').on('click', function(event) {
        var category='newcustomecatagory';
        $.ajax({
            data:{
                title:$('#nameInputnewhome').val(),
                query:$('#inputcontent').val(),
                data:$('#datadisplay').html(),
                category:category
            },
            type:'POST',
            url:"saveanything/",
            headers:{"X-CSRFToken": $crf_token},
            success: function(data){
               $('#newhomesave').modal('hide');
               $('#nameInputnewhome').html('');
               $('#datadisplay').html('');
               
            },
    
        });
    
    });


    $("#newhome").on('submit', function(event) { 
        var $crf_token = $('#newhome > [name="csrfmiddlewaretoken"]').attr('value');
        event.preventDefault(); 
        event.stopImmediatePropagation()  
        $.ajax({
            data:{
                name : $('#inputcontent').val(), 
                title : $('#drop_down').val(), 


            },
            type: "POST",
            url: "anything-generate/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
       
            },
            beforeSend: function(){
                $('#imageshow').show();
                $('#datadisplay').html('');
                
            },
            success: function(data){
                qry=data.query
                var res = qry.substring(0, 100);
                var htmlContent = '';
                htmlContent +=data.data
                $('#datadisplay').html(htmlContent);
                $('#tellmemoremail_newhome').show();
                $('#OpenModelnewhome').show();
                $('#imageshow').hide();
                $('#nameInputnewhome').val(res);

                

                
                newhome=htmlContent;  
              
            },
            timeout:120000
        });
        
        
    });


    $("#dalleform").on('submit', function(event) {
        $('#successError').hide();

        console.log($('#text').val())
        $("#dalleImage").empty();

        var $crf_token = $('#dalleform > [name="csrfmiddlewaretoken"]').attr('value');

        event.preventDefault(); 
        // event.stopImmediatePropagation()  
        $.ajax({
            data:{
                text : $('#text').val(), 
            },
            type: "POST",
            url: "test/",
            headers:{"X-CSRFToken": $crf_token},
            error: function(){
                callMeAgain();

            // var htmlContent = '<h3>Something wrong please try again</h3>';
            // $('#successError').html(htmlContent);
            // $('#image').hide();
            // $('#successError').show();
            },
            beforeSend: function(){
                $('#dalleImage').val()
                $('#imageshow').show(); 
                

            },
            success: function(data){
                $('#imageshow').hide();

                console.log("=======>",data)
                var htmlContent = '';
                
                data.data.map((row) => {
                    console.log("==========>",row)
                    
                   
                        // imagesarray+='data:image/jpeg;base64,'+row+''
                        // htmlContent += '<div class="succes_img"><a download="FILENAME.png" href="'+'data:image/jpeg;base64,'+row+'  dawnload"><img src="'+'data:image/jpeg;base64,'+row+'"> </a></div>';
                        // htmlContent+='<div class="succes_img"><input type="checkbox" value="data:image/jpeg;base64,'+row+'" name="imageselection[]" onChange=buttoncall(this)> <img src="'+'data:image/jpeg;base64,'+row+'"><a download="image.png" href="'+'data:image/jpeg;base64,'+row+'" dawnload><div class="middle"><button type="button">Download Me!</button></div></a></div>'
                         htmlContent+='<div class="dalle_img"><input type="checkbox" value="'+row+'" name="dalledawnload[]" onChange=buttoncall(this)><img src="'+row+'"></div>'
                        // htmlContent+='<img src="'+row+'">'
                      
            }); 
            // htmlContent+='<div class="dalleImage-box"><img src="'+data.data+'" class="img-fluid"></div>'
            $('#dalleImage').html(htmlContent);

        

            },
            // timeout:300000

            
        });
        
    });


  

   
    
});

function download_all_dalle(){
    textimageee=$('#text').val()

    var checkboxes = document.getElementsByName('dalledawnload[]');
    var text = document.getElementsByName('text');

    console.log(checkboxes)
    var totalChecked = $('input[name="dalledawnload[]"]:checked').length;
    
    console.log("value ==> ", totalChecked)
    var vals = [];
    for (var i=0, n=checkboxes.length;i<n;i++) 
    {
        if ((totalChecked > 0 && checkboxes[i].checked) || totalChecked == 0) 
        {
            const downloadLink = document.createElement("a");
            downloadLink.href = checkboxes[i].value;
            downloadLink.download = textimageee;
            downloadLink.click();
        }
    }    
}









var callMeAgain = function(){
    console.log($('#text').val())
    var $crf_token = $('#dalleform > [name="csrfmiddlewaretoken"]').attr('value');

    $.ajax({
        data:{
            text : $('#text').val(), 
        },
        type: "POST",
        dataType: "json",
        url: "test/",
        headers:{"X-CSRFToken": $crf_token},
        success: function(data){


            $('#imageshow').hide();
            var htmlContent = '';
            
            data.data.map((row) => {
                    htmlContent+='<img src="'+row+'">'     
        }); 

            $('#dalleImage').html(htmlContent);
        },
        error: function(xhr, textStatus, errorThrown) {
           var htmlContent = '<h3>Something wrong please try again</h3>';
            $('#successError').html(htmlContent);
            $('#imageshow').hide();
            $('#successError').show();
        }   
    });


}


function resetForm(){
    document.getElementById("newhome").reset();
    $("#datadisplay").empty();
    $('#drop_down').val('Generate anything');
    $("#inputcontent").val("");
}
function codeAddress(){
    var $crf_token = $('#newhome > [name="csrfmiddlewaretoken"]').attr('value');
   
 
    $.ajax({
        data:{
            name : $('#generateAnything').val(), 
            
        },
        type: "POST",
        url: "fromdatafetch/",
        headers:{"X-CSRFToken": $crf_token},
        beforeSend: function(){
          
        },
     
        success: function(data){
            var html = '';
            $.each(data.msg, function (i, value) {
                html += ('<option value="' + value.title + '">' + value.title + '</option>');

            });
            $("#drop_down").html(html);
            var answer=document.getElementById("drop_down");
            if(answer[answer.selectedIndex].value == "Joke") {
                document.getElementById("drop_down").value = "Generate anything";
               }
            
        },
       
    });
 
}