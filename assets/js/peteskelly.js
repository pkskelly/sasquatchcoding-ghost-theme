// code specific to peteskelly.com

// Load community events from Azure Function 
function loadCommunityEvents() {
    $.ajax({
    type: "GET",
    url: "https://prod-blog-functions-funcapp.azurewebsites.net/api/events?top=5&code=bMlAnMVjlvWg4qXPv38TlLKi7d1xXUaltwfj8tiVgvyQq0aXp7Hbwg==",
    dataType: "json",
    }).success( function( data ) {
        console.log(data);
        insertCommunityEvent(data);
    }).error(function(){
        insertCommunityEvent(null);
    });
}

function loadPodcasts() {
    $.ajax({
    type: "GET",
    url: "https://prod-blog-functions-funcapp.azurewebsites.net/api/podcasts?top=10&code=NCA/oPHQ724dQWL8xRQxUijwUfbwJoktdkSEmK2vPTlQUQ7OX1giTQ==",
    dataType: "json",
    }).success( function( data ) {
        console.log(data);
        insertPodcasts(data);
    }).error(function(){
        insertPodcasts(null);
    });
}

function insertCommunityEvent(eventData) {
       var eventInfo = '';
        //start building li's for upcoming events, only display 5 or less
       if(eventData !== null && eventData.length > 0) {
            var i = 0;
            var maxEvents = eventData.length <= 5 ? eventData.length : 5;     
            do {
                eventInfo += "<li><a title='"  + eventData[i].altText +  "' href='" + eventData[i].link + "' target='_blank'>" + eventData[i].displayName + "</a></li>";
                i++;
            }
            while (i < maxEvents);
        } else {
            //if no upcoming events            
            eventInfo += "<li>No upcoming events.</li>";
        }
        //Append the html of the comunity sidebar
        $('#communitySideBar').append(eventInfo);
}

function insertPodcasts(podcastData) {
    var podcasts = '';
    if(podcastData !== null && podcastData.length > 0) {
         var i = 0;
         var podcastMax = podcastData.length <= 10 ? podcastData.length : 10;     
         do {
             podcasts += "<li><a href='" + podcastData[i].url + "' target='_blank'>" + podcastData[i].name + "</a></li>";
             i++;
         }
         while (i < podcastMax);
     } else {
         //if no upcoming events            
         podcasts += "<li>No podcasts.</li>";
     }
     $('#podcastSideBar').append(podcasts);
}