$(function(){

    var $dbOut = $("#dbOut");
    
    $.ajax({
        type:"GET",
        url:"http://localhost:3000/user",
        success:function(user){
            $.each(user,function(i,user){
                dataBase(user);
            });
        },
        error:function(){
            alert("An Error was encountered");
        }
    });


 $("#generate").on("click",function(e){
     e.preventDefault();

     var pinVal = '0123456789'; 
     var pin = '';
    
    for (let i = 0; i < 11; i++ ) { 
        pin += pinVal[Math.floor(Math.random() * 10)]; 
     } 

      //Generating Serial Number
      var serialVal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
      var serial = ''; 

     for (let i = 0; i < 2; i++ ) { 
         serial += serialVal[Math.floor(Math.random() * serialVal.length)]; 
     }

      var regNum = pin + serial;

      var firstName = $("#firstName").val();
      var lastName = $("#lastName").val();
    var user ={
        "firstName": firstName,
        "lastName": lastName,
        "regNum": regNum
    };


    $.ajax({
        type:"POST",
        url:"http://localhost:3000/user",
        data:user,
        success:function(user){
            dataBase(user);
            alert("Pin generated successful\n"+user.firstName+"\n"+user.lastName+""+user.regNum);
            return window.location.href="#";
        },
        error:function(){
            return alert("An error occured");
        }
    });  
    });
      

    
    function dataBase(user){
        $dbOut.append('<tr><td>'+user.id+'</td><td>'+user.firstName+'</td><td>'+user.lastName+
        '</td><td>'+user.regNum+'</td><td><button id="'
        +user.id+'"class="dlt btn btn-primary">Delete</button></td></tr>');
       // console.log(pin.id);
    }
     
    $dbOut.delegate(".dlt","click",function(e){
        e.preventDefault();
        
        var id = $(this).attr("id");
        console.log(id); 
        $tr=(this).closest("tr");

        $.ajax({
            type:"DELETE",
            url:"http://localhost:3000/user/"+id,
            success:function(){
                $tr.remove();
                alert("User Deleted");
            },
            error:function(){
                alert("Invalid Recharge pin");
            }
        })
    })
})
