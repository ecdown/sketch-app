 
var gridWidth = 500;
function createGrid (numSquares)
{
  
  var webstring = "";
  var newwidth =  gridWidth / numSquares; 
  var newheight =  gridWidth / numSquares ;
  console.log(newwidth);
  $('#sketchpad').html("");
  for(var j = 0; j < numSquares; j++)
  {

    //webstring += '<div class="row">';
    var row = document.createElement("div");
    row.className = "row";
    for(var i = 0; i < numSquares; i++)
    {
      row.appendChild(document.createElement("div"));
    }
  $('#sketchpad').append(row);
  }
  $('#sketchpad div.row div').css("width",newwidth);
  $('#sketchpad div.row div').css("height",newheight);
  
}

function mouseTrails() {
     
     
     $('#sketchpad div.row div').css('background-color','black').css('opacity',1);  
  $('#sketchpad div.row div').off("mouseenter").mouseenter(function() {
    $(this).css('background','#fff').css('transition', 'background .15 ease-in-out');
    
  });
  $('#sketchpad div.row div').off("mouseleave").mouseleave(function() {
    $(this).css('background','#000').css('transition', 'background .75s ease-in-out');
    
  });
}

function opacityChange() {
  $('#sketchpad div.row div').off("mouseenter").mouseenter(function() {
     var currentOpacity = $(this).css("opacity");
     console.log(currentOpacity);
     if (currentOpacity < 1)
     {
       $(this).css("opacity",currentOpacity * 1.28);
     }
     if (currentOpacity == 0)
     {
       $(this).css("opacity",.1);
     }
    console.log("CHANGE");
  } );
}

function colorChange() {
  $('#sketchpad div.row div').off("mouseenter").mouseenter(function() {
    var newColor = getRandomColor();
    console.log("Change" + newColor);
    $(this).css("opacity", 1);
    $(this).css('background',newColor);
  });

}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function resetOpacity()
{
  $('#sketchpad div.row div').css("background-color","black").css("opacity",0).off('mouseenter').off('mouseleave').css('transition','');
}

function removeBorder() {
  var curWidth = $('#sketchpad div.row div').width();
  var curHeight = $('#sketchpad div.row div').height();
  $('#sketchpad div.row div').css('margin','0px').css('width',curWidth + 2).css('height',curHeight + 2);;
}

function addBorder() {
  var curWidth = $('#sketchpad div.row div').width();
  var curHeight = $('#sketchpad div.row div').height();
  $('#sketchpad div.row div').css('margin','1px').css('width',curWidth -2).css('height',curHeight - 2);;
}

function setOpacityHandler() {
  resetOpacity();
  console.log("Set Opacity Change");
  opacityChange();
   
}

$(document).ready(function(){

// Main
createGrid(16);
var border = 1;
var curMode = setOpacityHandler;
curMode();

$('#size').click(function() {
 
 while(1)
 {
   var num = prompt("Please specify Grid width between 1-100");
   if (num == '' || num == null)
   {
     return;
   }
   if (!isNaN(num))
   {
     break;
   }
   
 }
 
 createGrid(num);
 removeBorder();
 addBorder();
curMode();
 });
$('#reset').click(function() {
 
 resetOpacity();
 curMode();
 });
$('#opacity').click(function() {
  resetOpacity();  
  removeActive();
  $(this).addClass('active');
  curMode = setOpacityHandler;
  curMode();
  });

$('#color').click(function(){
  resetOpacity();
  removeActive();
  $(this).addClass('active');
  console.log("Set Color Change");
  curMode = colorChange;
  curMode();
});
$('#mousetrail').click(function(){
  resetOpacity();
  removeActive();
  $(this).addClass('active');
  console.log("Mouse Trails");
  curMode = mouseTrails;
  curMode();
});

$('#border').click(function() {
  $('#on').toggle(); 
  $('#off').toggle();
  if (border == 1)
  {
    removeBorder();
    border = 0;
  }
  else
  {
    addBorder();
    border = 1;
  }
} );

function removeActive() {
  $('ul li').removeClass('active');
}



});

