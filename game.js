var gamepattern=[];
var buttoncolors=["red","blue","green","yellow"];
var userclickedpattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(started==false)
    {
        $("#level-title").text("Level"+level);
        nextsequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userchoosencolor=$(this).attr("id");
    userclickedpattern.push(userchoosencolor);
    playsound(userchoosencolor);
    animatepress(userchoosencolor);
    checkanswer(userclickedpattern.length-1);
});
function nextsequence()
{
    userclickedpattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomchoosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchoosencolor);
    $("#"+randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchoosencolor);

}
function playsound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatepress(currentcolor)
{
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentcolor).removeClass("pressed");
    },100);
}
function checkanswer(currentlevel)
{
    if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        if(gamepattern.length===userclickedpattern.length)
    {
        setTimeout(function() {
            nextsequence();
        },1000);
    }
    }
    else
    {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
}
function startover(){
    started=false;
    level=0;
    gamepattern=[];
}
