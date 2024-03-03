function convertCurrencyINR(value,currency) {
    if(currency=='INR')
    return value*1;
    if(currency=='USD')
    return value*83.12;
    if(currency=='EUR')
    return value*90.9;
}

let place =
{
    'golconda': [17.3833, 78.4011],
    'lotusTemple': [28.5535, 77.2588],
    'edakkalCaves': [11.6266, 76.2348],
    'indiaGate': [28.6129, 77.2295],
    'wonderla': [10.0257, 76.3926],
    'scienceCentre': [10.30, 76.33],
};

let val="hyderabadh.html";
let currency='INR';
let flight = 5, train = 1.16;
let star = [ 500, 750, 1000, 1500, 2000 ];
let currPoint, destiPoint, transport;

function currencyChange(value)
{
    currency=value;
}

function destination(value)
{
    destiPoint = place[value];
    if(value=='golconda')
    val="hyderabadh.html";
    if(value=='lotusTemple')
    val="delhih.html";
    if(value=='edakkalCaves')
    val="kerelah.html";
    if(value=='indiaGate')
    val="mumbaih.html";
    if(value=='wonderla')
    val="bangaloreh.html";
    if(value=='scienceCentre')
    val="kerelah.html";
}

function irctc()
{
    window.location.href = "https://www.irctc.co.in/nget/train-search";
}

function easytrip()
{
    window.location.href = "https://www.easemytrip.com/flights.html";
}

function hotelgo()
{
    window.location.href = val;
}

function onSubmission()
{
    document.getElementById("output1").style.display="block";
    document.getElementById("output1").style.visibility="visible";
    document.getElementById("output2").style.display="block";
    document.getElementById("output2").style.visibility="visible";
    document.getElementById("output3").style.display="block";
    document.getElementById("output3").style.visibility="visible";

    navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position)
{
    currPoint = [position.coords.latitude,position.coords.longitude];
    console.log(currPoint);
    getExpense();
}

function getExpense()
{
    try
    {
        document.getElementById("result").innerText = "";
        document.getElementById("mode1").innerText = "";
        document.getElementById("hotel1").innerText = "";
        document.getElementById("reserved1").innerText = "";
        document.getElementById("mode2").innerText = "";
        document.getElementById("hotel2").innerText = "";
        document.getElementById("reserved2").innerText = "";
        if(document.getElementById("mode1").hasChildNodes())
        document.getElementById("mode1").removeChild(document.getElementById("hotel1").children[0]);
        if(document.getElementById("mode2").hasChildNodes())
        document.getElementById("mode2").removeChild(document.getElementById("hotel2").children[0]);
        if(document.getElementById("hotel1").hasChildNodes())
        document.getElementById("hotel1").removeChild(document.getElementById("hotel1").children[0]);
        if(document.getElementById("hotel2").hasChildNodes())
        document.getElementById("hotel2").removeChild(document.getElementById("hotel2").children[0]);
        document.getElementById("mode1b1").style.visibility="hidden";
        document.getElementById("mode1b2").style.visibility="hidden";
        document.getElementById("mode2b1").style.visibility="hidden";
        document.getElementById("mode2b2").style.visibility="hidden";
        document.getElementById("mode1b1").style.display="none";
        document.getElementById("mode1b2").style.display="none";
        document.getElementById("mode2b1").style.display="none";
        document.getElementById("mode2b2").style.display="none";


        let distance = Math.sqrt(Math.abs(currPoint[0]-destiPoint[0])**2+Math.abs(currPoint[1]-destiPoint[1])**2)*111.1;
        let budget = document.getElementById("bdgt").value;
        let num = document.getElementById("num").value;
        let days = document.getElementById("dys").value;
        let room = document.getElementById("room").value;

        if(budget == "" || num == "" || days == "" || room=="")
        {
            document.getElementById("result").innerText = "Please enter all details first";
            return;
        }
        let flag=0;
        budget = parseInt(budget);
        budget = parseInt(convertCurrencyINR(budget,currency));
        console.log(budget);
        num = parseInt(num);
        days = parseInt(days);
        room = parseInt(room);


        let flightBudget=budget*35/100;
        let trainBudget=budget*35/100;
        let hotelBudget=budget*45/100;
        let reserved=budget*20/100;


        if(trainBudget<distance*train*2*num)
        {
            document.getElementById("mode1").innerText = "This plan is out of your budget";

            document.getElementById("mode2").innerText = "This plan is out of your budget";
            return;
        }
        else
        {
            let spend=parseInt(distance*train*2*num/100)*100;
            document.getElementById("mode1").innerText = "You can travel by train for Rs "+spend+". For more details click ";
            document.getElementById("mode1b1").style.visibility="visible";
            document.getElementById("mode1b1").style.display="flex";
            trainBudget-=spend;
            // var temp_link = document.createElement("a");            
            // temp_link.href = "https://www.irctc.co.in/nget/train-search";
            // temp_link.innerHTML = "here";
            // document.getElementById("mode1").appendChild(temp_link);
        }
        if(flightBudget<distance*flight*2*num)
        {
            document.getElementById("mode2").innerText = "Budget is too low to accomodate a flight. Sorry!!";
        }
        else
        {
            flag=1;
            let spend=parseInt(distance*flight*2*num/100)*100;
            document.getElementById("mode2").innerText = "You can travel by flight for Rs "+spend+". For more details click ";
            document.getElementById("mode2b1").style.visibility="visible";
            document.getElementById("mode2b1").style.display="flex";
            flightBudget-=spend;
        }


        if(hotelBudget<(days)*star[0]*room)
        {
            document.getElementById("mode1").innerText = "This plan is out of your budget";
            document.getElementById("mode2").innerText = "This plan is out of your budget";
            document.getElementById("mode1b1").style.visibility="hidden";
            document.getElementById("mode1b2").style.visibility="hidden";
            document.getElementById("mode2b1").style.visibility="hidden";
            document.getElementById("mode2b2").style.visibility="hidden";
            document.getElementById("mode1b1").style.display="none";
            document.getElementById("mode1b2").style.display="none";
            document.getElementById("mode2b1").style.display="none";
            document.getElementById("mode2b2").style.display="none";

            return;
        }
        for(let i=5;i>=1;i--)
        if(hotelBudget>=(days)*star[i-1]*room)
        {
            spend=days*star[i-1]*room;
            document.getElementById("hotel1").innerText = "You can accomodate "+i+" star hotel rooms for Rs "+spend+". For more details click ";
            document.getElementById("mode1b2").style.visibility="visible";
            document.getElementById("mode1b2").style.display="flex";
            if(flag==1)
            {
                document.getElementById("hotel2").innerText = "You can accomodate "+i+" star hotel rooms for Rs "+spend+". For more details click ";
                document.getElementById("mode2b2").style.visibility="visible";
                document.getElementById("mode2b2").style.display="flex";
            }
            hotelBudget-=spend;
            break;
        }

        reserved+=hotelBudget;
        document.getElementById("reserved1").innerText = "Rs "+(reserved+trainBudget)+" is reserved for sight-seeing and other necessities";
        if(flag==1)
        document.getElementById("reserved2").innerText = "Rs "+(reserved+flightBudget)+" is reserved for sight-seeing and other necessities";
    }
    catch(error)
    {
        document.getElementById("result").innerText = "Please enter all details first";
        document.getElementById("output1").style.display="none";
        document.getElementById("output2").style.display="none";
        document.getElementById("output3").style.display="none";
    }
}
function getvisible1(){
    document.getElementById("signin").style.visibility='visible';
    document.getElementById("signin").style.display='flex';
    document.getElementById("signup").style.visibility='hidden';
    document.getElementById("signup").style.display='none';
    
}
function getvisible2(){
    document.getElementById("signin").style.visibility='hidden';
    document.getElementById("signin").style.display='none';
    document.getElementById("signup").style.visibility='visible';
    document.getElementById("signup").style.display='flex';
}
function gethidden(){
    document.getElementById("signup").style.visibility='hidden';
    document.getElementById("signin").style.visibility='hidden';
    document.getElementById("signup").style.display='none';
    document.getElementById("signin").style.display='none';
}