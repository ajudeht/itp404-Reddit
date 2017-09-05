var sr;

window.onhashchange = function() {
  init();
}

function init(){

var hash = window.location.hash.substr(1);

document.querySelector("#container").innerHTML = "<div class='loadgradbox'></div>";
document.querySelector("#subholder").innerHTML = "Loading...";


if (hash){

sr = hash
loadData(sr);

} else {


sr = "all";
loadData(sr);
}

searchSubreddits().then(
  (response) => {

    var fullHTML;

    var data = response.data.children;

/*document.querySelector("#headersublist").innerHTML = "";

    data.map(function(sub, index){

if (index < 20){
if (index > 0){
  document.querySelector("#headersublist").innerHTML += " - ";
}
        var postHTML = `<a class="headerpost " href="#${sub.data.display_name}">${sub.data.display_name}</a>`;

        document.querySelector("#headersublist").innerHTML += postHTML;
}

    });*/

  },
  (error) => {
    console.log("o no it's an error");
  },
);

}


function loadData(subreddit){


getSubData(subreddit).then(
  (response) => {
console.log("about", response);

  document.querySelector("#recsub").innerHTML = response.data.title;
document.querySelector("#subhead").style.display = "block";
  document.querySelector("#subhead").style.background = `linear-gradient(60deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)),url(${response.data.banner_img})`;
    document.querySelector("#subhead").style.backgroundBlendMode = "multiply";
  document.querySelector("#subhead").innerText = response.data.display_name_prefixed;

}, (error) => {

document.querySelector("#subhead").style.display = "none";

})

  getSubreddit(subreddit).then(
    (response) => {

      console.log(response);

      var data = response.data.children;

document.querySelector("#container").innerHTML = "";
document.querySelector("#container").innerHTML = "<div class='loadgradbox shrink'></div>";

      data.map(function(post, index){

        var thumbnailHandler = (thumbnail) => {
/*console.log("thumb",thumbnail);*/

        if (thumbnail == "default"){
          return `display: none;`
        } else if (thumbnail == "nsfw"){
          return `display: none;`
        } else if (thumbnail == "self"){
          return `display: none;`
        } else if (thumbnail == "spoiler"){
          return `display: none;`
        } else {
          return `background-image: url('${thumbnail}');`
        }

        }

          var postHTML = `
          <div class="post animated fadeInUp" style="
          -webkit-animation-delay: ${0.1 * index}s;
          -moz-animation-delay: ${0.1 * index}s;
          -ms-animation-delay: ${0.1 * index}s;
          -o-animation-delay: ${0.1 * index}s;
          animation-delay: ${0.1 * index}s;">
          <div class="post-left" style="${thumbnailHandler(post.data.thumbnail)}"></div>
          <div class="post-right">
          <a href="#${post.data.subreddit}" class="postsub">${post.data.subreddit_name_prefixed}</a>
          <a href="http://${post.data.domain}" class="postdom">${post.data.domain}</a>
          <a href="${post.data.url}"><div class="postTitle" >${post.data.title}</div></a>
        <a href="https://reddit.com/${post.data.permalink}"><div>${post.data.num_comments} Comments<div></a>
        </div>

          </div>`;

  document.querySelector("#container").innerHTML += postHTML;


      });

    },
    (error) => {
      console.log("o no it's an error");
    },
  );


if (subreddit == "all"){

document.querySelector("#subrecs").style.display = "none";

} else {

document.querySelector("#subrecs").style.display = "block";

  searchSubreddits(subreddit).then(
    (response) => {

      //console.log("subreddits: ", response);

      var data = response.data.children;

      document.querySelector("#subholder").innerHTML = "";

      data.map(function(sub, index){

        //console.log(sub);

            var postHTML = `<a class="subitem animated fadeInUp" style="
            -webkit-animation-delay: ${0.01 * index}s;
            -moz-animation-delay: ${0.01 * index}s;
            -ms-animation-delay: ${0.01 * index}s;
            -o-animation-delay: ${0.01 * index}s;
            animation-delay: ${0.01 * index}s;" href="#${sub.data.display_name}">${sub.data.display_name_prefixed}</a>`;

          document.querySelector("#subholder").innerHTML += postHTML;

      });

    },
    (error) => {
      console.log("o no it's an error");
    },
  );

}





}


function getSubreddit(subreddit){

var subredditURL = 'https://www.reddit.com/r/' + subreddit + '.json';

return  $.getJSON(subredditURL);

}

function getSubData(subreddit){

  return  $.getJSON(`https://www.reddit.com/r/${subreddit}/about.json`);

}


function searchPosts(query, subreddit){

var searchURL;

if(subreddit){

searchURL = 'https://www.reddit.com/r/' + subreddit + '/search.json' + '?q=' + query;
return  $.getJSON(searchURL);

} else {

searchURL = 'https://www.reddit.com/search.json' + '?q=' + query;
return  $.getJSON(searchURL);

}

}

function searchSubreddits(query){
var searchURL;

if (query){

searchURL = 'https://www.reddit.com/reddits/search.json' + '?q=' + query;
return  $.getJSON(searchURL);

} else {

searchURL = 'https://www.reddit.com/reddits.json';

return  $.getJSON(searchURL);

}

}


window.addEventListener('scroll', function(e) {
  scrollPos = window.scrollY;
  var headerHide = [...document.querySelectorAll(".headerhide")];
  var headerSubList = document.querySelector("#headersublist");



  if (scrollPos > 100){

    if (headerSubList){
    document.querySelector("#headersublist").style.paddingTop = '.8em';
    }

    headerHide.map(function(item, index){ item.style.display = "block" });

  } else {

    if (headerSubList){
    document.querySelector("#headersublist").style.paddingTop = '0';
    }

    headerHide.map(function(item, index){ item.style.display = "none" });

  }

});
