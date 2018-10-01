var flashNPS = {
    netPromoter:{questionID: "58884e79ce87710cc89b1215"},
    defaultIndex: false,
    detractors: 23,
    netPromoters: 50,
    passive: 18,
    promoters: 59,
    questionID: "58884e79ce87710cc89b1215",
    questionText: "Based on this experience, how likely are you to recommend Cloudcherry to your friends or family?",
    totalResponses: 4
}

var red = flashNPS.detractors;
var yellow = flashNPS.passive;
var green = flashNPS.promoters;


function showNPS(ccDisplayNPSValue){
    var npsScore = green-red;
	ccDisplayNPSValue.innerHTML = Math.trunc(npsScore);
}
function showLabels(ccDetractorsPercent,ccPassivesPercent,ccPromotersPercent){
	ccDetractorsPercent.innerHTML = Math.trunc(red)+'%';
    ccPassivesPercent.innerHTML = Math.trunc(yellow)+'%';
    ccPromotersPercent.innerHTML = Math.trunc(green)+'%';
}
function showChart(ccDetractChart,ccPassiveChart,ccPromoterChart){
    ccDetractChart.style.width = Math.trunc(red) + '%';
    ccPassiveChart.style.width = Math.trunc(yellow)+ '%';
    ccPromoterChart.style.width = Math.trunc(green)+ '%';
}
function getCall(){
    var httpRequest;
    var apiKey = "cxdemo";
    var user = "cxdemo";
    var location = "Booking Experience";
    var url = "https://api.getcloudcherry.com/api/LatestScore/" + user + "/" + apiKey + "/" + location;
    httpRequest = new XMLHttpRequest();

    if(!httpRequest){
        alert('Error');
        return false;
    }
    httpRequest.onreadystatechange = displayContents;
    /*httpRequest.withCredentials = true;*/
    httpRequest.open('GET',url);
    httpRequest.setRequestHeader('Access-Control-Allow-Origin','https://api.getcloudcherry.com');
    httpRequest.send();
    function displayContents(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                alert(httpRequest.responseText);
            }
            else{
                alert('Problem');
            }
        }
    }
}

function createDocument(){

    var ccBlackBox = document.createElement("div");
    ccBlackBox.className = "cc-black-box";

    var ccTitle = document.createElement("div");
    ccTitle.className = "cc-title";
    ccTitle.innerHTML = "Net Promoter Score(NPS)";

    var ccChartNPS = document.createElement("div");
    ccChartNPS.className = "cc-chart-NPS";

    var ccChart = document.createElement("div");
    ccChart.className = "cc-chart";

    var ccDetractChart = document.createElement("div");
    var ccPassiveChart = document.createElement("div");
    var ccPromoterChart = document.createElement("div");

    ccDetractChart.id = "cc-detract-chart";
    ccPassiveChart.id = "cc-passive-chart";
    ccPromoterChart.id = "cc-promoter-chart";

    ccChart.appendChild(ccDetractChart);
    ccChart.appendChild(ccPassiveChart)
    ccChart.appendChild(ccPromoterChart)

    var ccNPS = document.createElement("div");
    ccNPS.className = "cc-NPS";

    var ccDisplayNPS = document.createElement("div");
    ccDisplayNPS.innerHTML = "NPS SCORE";
    ccDisplayNPS.className = "cc-display-NPS";

    var ccDisplayNPSValue = document.createElement("div");
    ccDisplayNPSValue.id = "cc-display-NPS-value";

    ccNPS.appendChild(ccDisplayNPS);
    ccNPS.appendChild(ccDisplayNPSValue);
    ccChartNPS.appendChild(ccChart);
    ccChartNPS.appendChild(ccNPS);
    
    var ccLabels = document.createElement("div");
    ccLabels.className = "cc-labels";
    
    var ccLabel1 = document.createElement("div");
    ccLabel1.className = "cc-label";

    var ccDetractorsPrint = document.createElement("div");
    ccDetractorsPrint.innerHTML = "Detractors";

    var ccLabelDim1 = document.createElement("div");
    ccLabelDim1.className = "cc-label-dim";

    var ccLabelProp1 = document.createElement("div");
    ccLabelProp1.className = "cc-label-prop";

    var ccDetractorsPercent = document.createElement("div");
    ccDetractorsPercent.id = "cc-detractors-percent";

    ccLabels.appendChild(ccLabel1);
    ccLabel1.appendChild(ccDetractorsPrint);
    ccLabel1.appendChild(ccLabelDim1)
    ccLabelDim1.appendChild(ccLabelProp1);
    ccLabelDim1.appendChild(ccDetractorsPercent);
    
    var ccLabel2 = document.createElement("div");
    ccLabel2.className = "cc-label";

    var ccPassivesPrint = document.createElement("div");
    ccPassivesPrint.innerHTML = "Passives";

    var ccLabelDim2 = document.createElement("div");
    ccLabelDim2.className = "cc-label-dim";

    var ccLabelProp2 = document.createElement("div");
    ccLabelProp2.className = "cc-label-prop";

    var ccPassivesPercent = document.createElement("div");
    ccPassivesPercent.id = "cc-passives-percent";

    ccLabels.appendChild(ccLabel2);
    ccLabel2.appendChild(ccPassivesPrint);
    ccLabel2.appendChild(ccLabelDim2)
    ccLabelDim2.appendChild(ccLabelProp2);
    ccLabelDim2.appendChild(ccPassivesPercent);

    var ccLabel3 = document.createElement("div");
    ccLabel3.className = "cc-label";

    var ccPromotersPrint = document.createElement("div");
    ccPromotersPrint.innerHTML = "Promoters";

    var ccLabelDim3 = document.createElement("div");
    ccLabelDim3.className = "cc-label-dim";

    var ccLabelProp3 = document.createElement("div");
    ccLabelProp3.className = "cc-label-prop";

    var ccPromotersPercent = document.createElement("div");
    ccPromotersPercent.id = "cc-promoters-percent";

    ccLabels.appendChild(ccLabel3);
    ccLabel3.appendChild(ccPromotersPrint);
    ccLabel3.appendChild(ccLabelDim3)
    ccLabelDim3.appendChild(ccLabelProp3);
    ccLabelDim3.appendChild(ccPromotersPercent);

    ccLabels.appendChild(ccLabel1);
    ccLabels.appendChild(ccLabel2);
    ccLabels.appendChild(ccLabel3);


    ccBlackBox.appendChild(ccTitle);
    ccBlackBox.appendChild(ccChartNPS);
    ccBlackBox.appendChild(ccLabels);

    showNPS(ccDisplayNPSValue);
    showLabels(ccDetractorsPercent,ccPassivesPercent,ccPromotersPercent);
    showChart(ccDetractChart,ccPassiveChart,ccPromoterChart);

    var Destination = document.getElementById("cc-widget-plug-in");
    Destination.appendChild(ccBlackBox);

}
createDocument();
getCall();        