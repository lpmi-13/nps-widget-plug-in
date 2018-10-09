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
    var url = "https://api.getcloudcherry.com/api/LatestScore/" + user + "/" + RSS_key + "/" + location;
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

    var scriptName = document.getElementById('cc-widget-script');
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
}
function createDocument(){
    var ccBlackBox = createNewElement("div","cc-black-box",null);

    var ccTitle = createNewElement("div","cc-title",null);
    ccTitle.innerHTML = "Net Promoter Score(NPS)";

    var ccChartNPS = createNewElement("table","cc-chart-NPS",null);
    var ccChartNPSTbody = createNewElement("tbody",null,null);

    var ccChartNPSRow = createNewElement("tr",null,null);
    var ccChartNPSRowChart = createNewElement("td",null,null);
    var ccChartNPSRowNPS = createNewElement("td","cc-NPS",null);

    var ccChart = createNewElement("table","cc-chart",null);
    var ccChartTbody = createNewElement("tbody",null,null);

    var ccChartRow = createNewElement("tr",null,null);
    var ccDetractChart = createNewElement("td",null,"cc-detract-chart");
    var ccPassiveChart = createNewElement("td",null,"cc-passive-chart");
    var ccPromoterChart = createNewElement("td",null,"cc-promoter-chart");

    var ccDisplayNPS = createNewElement("table","cc-display-NPS",null);
    var ccDisplayNPSTbody = createNewElement("tbody",null,null);
    var ccDisplayNPSRow1 = createNewElement("tr",null,null);
    var ccDisplayNPSRow2 = createNewElement("tr",null,null);
    var ccNPSScore = createNewElement("td","cc-NPS-caption",null);
    ccNPSScore.innerHTML = "NPS SCORE";
    var ccDisplayNPSValue = createNewElement("td",null,"cc-display-NPS-value");

    makeChild(ccChartNPS,[ccChartNPSTbody]);
    makeChild(ccChartNPSTbody,[ccChartNPSRow]);
    makeChild(ccChartNPSRow,[ccChartNPSRowChart,ccChartNPSRowNPS]);
    makeChild(ccChartRow,[ccDetractChart,ccPassiveChart,ccPromoterChart]);
    makeChild(ccChartTbody,[ccChartRow]);
    makeChild(ccChart,[ccChartTbody]);
    makeChild(ccChartNPSRowChart,[ccChart]);
    makeChild(ccChartNPSRowNPS,[ccDisplayNPS]);
    makeChild(ccDisplayNPS,[ccDisplayNPSTbody]);
    makeChild(ccDisplayNPSTbody,[ccDisplayNPSRow1,ccDisplayNPSRow2]);
    makeChild(ccDisplayNPSRow1,[ccNPSScore]);
    makeChild(ccDisplayNPSRow2,[ccDisplayNPSValue]);

    var ccLabels = createNewElement("table","cc-labels",null);
    var ccLabelsTbody = createNewElement("tbody",null,null);
    var ccLabelsRow1 = createNewElement("tr",null,null);
    var ccLabelsRow2 = createNewElement("tr",null,null);

    var ccDetractors = createNewElement("td","cc-label-caption",null); 
    var ccPassives = createNewElement("td","cc-label-caption",null);
    var ccPromoters = createNewElement("td","cc-label-caption",null); 

    ccDetractors.colSpan = ccPassives.colSpan = ccPromoters.colSpan = 2;

    ccDetractors.innerHTML = "Detractors";
    ccPassives.innerHTML = "Passives" ;
    ccPromoters.innerHTML = "Promoters";

    ccLabelLegend1 = createNewElement("td","cc-label-legend",null);
    ccLabelLegend2 = createNewElement("td","cc-label-legend",null);
    ccLabelLegend3 = createNewElement("td","cc-label-legend",null);

    ccDetractorsPercent = createNewElement("td",null,"cc-detractors-percent");
    ccPassivesPercent = createNewElement("td",null,"cc-passives-percent");
    ccPromotersPercent = createNewElement("td",null,"cc-promoters-percent");

    ccLabelProp1 = createNewElement("div","cc-label-prop",null);
    ccLabelProp2 = createNewElement("div","cc-label-prop",null);
    ccLabelProp3 = createNewElement("div","cc-label-prop",null);

    makeChild(ccLabels,[ccLabelsTbody]);
    makeChild(ccLabelsTbody,[ccLabelsRow1,ccLabelsRow2]);
    makeChild(ccLabelsRow1,[ccDetractors,ccPassives,ccPromoters]);
    makeChild(ccLabelsRow2,[ccLabelLegend1,ccDetractorsPercent,ccLabelLegend2,ccPassivesPercent,ccLabelLegend3,ccPromotersPercent]);
    makeChild(ccLabelLegend1,[ccLabelProp1]);
    makeChild(ccLabelLegend2,[ccLabelProp2]);
    makeChild(ccLabelLegend3,[ccLabelProp3]);

    makeChild(ccBlackBox,[ccTitle,ccChartNPS,ccLabels]);

    ccShowNPS(ccDisplayNPSValue);
    ccShowLabels(ccDetractorsPercent,ccPassivesPercent,ccPromotersPercent);
    ccShowChart(ccDetractChart,ccPassiveChart,ccPromoterChart);

    var Destination = document.getElementsByClassName("cc-widget-plug-in");

    for(var i=0;i<Destination.length;i++){
        makeChild(Destination[i],[ccBlackBox]);
    }

}
ccGetCredentials()

