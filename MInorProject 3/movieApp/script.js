const apiKey = "4b8e8742";

const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const year = document.getElementById("year");
const rating = document.getElementById("rating");
const genre = document.getElementById("genre");
const released = document.getElementById("released");
const plot = document.getElementById("plot");
const error = document.getElementById("error");

const searchMovie = async () => {

    const movie = movieInput.value.trim();

    if(movie===""){
        error.innerText="Please enter a movie name.";
        return;
    }

    error.innerText="";

    const url=`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;

    try{

        const response=await fetch(url);
        const data=await response.json();

        if(data.Response==="False"){
            throw new Error(data.Error);
        }

        const{
            Title,
            Year,
            imdbRating,
            Genre,
            Released,
            Plot,
            Poster
        }=data;

        title.innerText=Title;
        year.innerText=Year;
        rating.innerText=imdbRating;
        genre.innerText=Genre;
        released.innerText=Released;
        plot.innerText=Plot;
        poster.src=Poster;

    }
    catch(err){

        poster.src="";
        title.innerText="Movie Title";
        year.innerText="--";
        rating.innerText="--";
        genre.innerText="--";
        released.innerText="--";
        plot.innerText="";
        error.innerText=err.message;

    }

}

searchBtn.addEventListener("click",searchMovie);

movieInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){
searchMovie();
}

});