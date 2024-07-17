const inputE1=document.querySelector("#input")
const infotext=document.querySelector("#info-text");
const meaning=document.querySelector(".meaning-container");
const title=document.querySelector("#title");
const meaning1=document.querySelector("#meaning");
const audio=document.querySelector("#audio")
async function fetchAPI(word){
    try{
        infotext.style.display="block";
        console.log(word);
        infotext.innerText=`searching the meaning of "${word}"`;
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result= await fetch(url).then((res)=>res.json());
        // document.querySelector(".meaning").innerHTML=result;
        console.log(result);
        if(result.title){
            infotext.style.display="none";
            meaning.style.display="block";
            title.innerText=word;
            meaning1.innerText="N/A";
            audio.style.display="none";
        }else{
            infotext.style.display="none";
            meaning.style.display="block";
            audio.style.display="inline-flex";
            title.innerText=result[0].word;
            meaning1.innerText=result[0].meanings[0].definitions[0].definition;
            audio.src=result[0].phonetics[0].audio;
        }
    }catch(error){
        console.log(error);
        infotext.innerText=`an error happened try again later`;
    }
}

inputE1.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key=== "Enter"){
        fetchAPI(e.target.value)
    }
})