var LatestScore = [];
var red;
var yellow;
var green;
var npsScore;

function ccShowNPS(ccDisplayNPSValue){
	ccDisplayNPSValue.innerHTML = npsScore;
}
function ccShowLabels(ccDetractorsPercent,ccPassivesPercent,ccPromotersPercent){
	ccDetractorsPercent.innerHTML = red +'%';
    ccPassivesPercent.innerHTML = yellow +'%';
    ccPromotersPercent.innerHTML = green +'%';
}
function ccShowChart(ccDetractChart,ccPassiveChart,ccPromoterChart){
    ccDetractChart.style.width = red + '%';
    ccPassiveChart.style.width = yellow + '%';
    ccPromoterChart.style.width = green + '%';
}
function ccGetCall(user,RSS_key,location){
    var httpRequest;
    var url = `https://api.getcloudcherry.com/api/LatestScore/${user}/${RSS_key}/${location}`;
    httpRequest = new XMLHttpRequest();

    if(!httpRequest){
        alert('Error');
        return false;
    }
    httpRequest.onreadystatechange = displayContents;
    httpRequest.open('GET',url);
    httpRequest.send();
    function displayContents(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                LatestScore = JSON.parse(httpRequest.responseText);

                red = LatestScore[0].netpromoter.detractors;
                yellow = LatestScore[0].netpromoter.passive;
                green = LatestScore[0].netpromoter.promoters;
                npsScore = LatestScore[0].netpromoter.netPromoters;
                createDocument(); 
            }
            else{
                alert('Problem');
            }
        }
    }
}
function ccGetCredentials(){
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length-1];
    var scriptName = lastScript;

    var user = scriptName.getAttribute('user');
    var RSS_key = scriptName.getAttribute('RSS_key');
    var location  = scriptName.getAttribute('location');

    ccGetCall(user,RSS_key,location); 
}
function createNewElement(ele_type,nameClass,nameId){
    var newElement = document.createElement(ele_type);

    if(nameClass != null){
        newElement.className = nameClass;
    }
    if(nameId != null){
        newElement.id = nameId;
    }
    
    return newElement;
}
function makeChild(parent_ele,arr){
    
    for(var i=0;i<arr.length;i++){
        parent_ele.appendChild(arr[i]);
    }

    return parent_ele;
}
function createDocument(){
    var ccBlackBox = createNewElement("div","cc-black-box",null);

    var ccTitle = createNewElement("div","cc-title",null);
    ccTitle.innerHTML = "Net Promoter Score(NPS)";

    var ccChartNPS = createNewElement("div","cc-chart-NPS",null);

    var ccChart = createNewElement("div","cc-chart",null);

    var ccDetractChart = createNewElement("div",null,"cc-detract-chart");
    var ccPassiveChart = createNewElement("div",null,"cc-passive-chart");
    var ccPromoterChart = createNewElement("div",null,"cc-promoter-chart");

    ccChart = makeChild(ccChart,[ccDetractChart,ccPassiveChart,ccPromoterChart]);

    var ccNPS = createNewElement("div","cc-NPS",null);

    var ccDisplayNPS = createNewElement("div","cc-display-NPS",null);
    ccDisplayNPS.innerHTML = "NPS SCORE";

    var ccDisplayNPSValue = createNewElement("div",null,"cc-display-NPS-value");

    ccNPS = makeChild(ccNPS,[ccDisplayNPS,ccDisplayNPSValue]);
    ccChartNPS = makeChild(ccChartNPS,[ccChart,ccNPS]);
    
    var ccLabels = createNewElement("div","cc-labels",null);

    var ccLabel1 = createNewElement("div","cc-label",null);
    var ccLabel2 = createNewElement("div","cc-label",null);
    var ccLabel3 = createNewElement("div","cc-label",null);

    var ccDetractorsPrint = createNewElement("div",null,null);
    var ccPassivesPrint = createNewElement("div",null,null);
    var ccPromotersPrint = createNewElement("div",null,null);

    ccDetractorsPrint.innerHTML = "Detractors";
    ccPassivesPrint.innerHTML = "Passives";
    ccPromotersPrint.innerHTML = "Promoters";

    var ccLabelDim1 = createNewElement("div","cc-label-dim",null);
    var ccLabelDim2 = createNewElement("div","cc-label-dim",null);
    var ccLabelDim3 = createNewElement("div","cc-label-dim",null);

    var ccLabelProp1 = createNewElement("div","cc-label-prop",null);
    var ccLabelProp2 = createNewElement("div","cc-label-prop",null);
    var ccLabelProp3 = createNewElement("div","cc-label-prop",null);

    var ccDetractorsPercent = createNewElement("div",null,"cc-detractors-percent");
    var ccPassivesPercent = createNewElement("div",null,"cc-passives-percent");
    var ccPromotersPercent = createNewElement("div",null,"cc-promoters-percent");

    ccLabels = makeChild(ccLabels,[ccLabel1,ccLabel2,ccLabel3]);

    ccLabel1 = makeChild(ccLabel1,[ccDetractorsPrint,ccLabelDim1]);
    ccLabel2 = makeChild(ccLabel2,[ccPassivesPrint,ccLabelDim2]);
    ccLabel3 = makeChild(ccLabel3,[ccPromotersPrint,ccLabelDim3]);

    ccLabelDim1 = makeChild(ccLabelDim1,[ccLabelProp1,ccDetractorsPercent]);
    ccLabelDim2 = makeChild(ccLabelDim2,[ccLabelProp2,ccPassivesPercent]);
    ccLabelDim3 = makeChild(ccLabelDim3,[ccLabelProp3,ccPromotersPercent]);
    
    ccBlackBox = makeChild(ccBlackBox,[ccTitle,ccChartNPS,ccLabels]);
   
    ccShowNPS(ccDisplayNPSValue);
    ccShowLabels(ccDetractorsPercent,ccPassivesPercent,ccPromotersPercent);
    ccShowChart(ccDetractChart,ccPassiveChart,ccPromoterChart);

    var Destination = document.getElementById("cc-widget-plug-in");
    Destination.appendChild(ccBlackBox);

}
ccGetCredentials()

