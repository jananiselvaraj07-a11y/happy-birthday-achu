/* ==========================
   GLOBAL MUSIC PLAYER
========================== */

let bgMusic = new Audio(
    window.location.pathname.includes("/pages/")
    ? "../music/birthday.mp3"
    : "music/birthday.mp3"
);

bgMusic.loop = true;
bgMusic.volume = 0.35;


/* ==========================
   MUSIC PERSISTENCE
========================== */


function saveMusicState(){

    localStorage.setItem(
        "musicTime",
        bgMusic.currentTime
    );

    localStorage.setItem(
        "musicPlaying",
        "true"
    );

}



function startMusic(){


    const savedTime =
    localStorage.getItem("musicTime");


    if(savedTime){

        bgMusic.currentTime =
        Number(savedTime);

    }


    bgMusic.play()
    .then(()=>{

        console.log("Music resumed");

    })
    .catch(()=>{

        console.log(
            "Waiting for interaction"
        );


        // Chrome fallback
        document.addEventListener(
            "click",
            ()=>{

                bgMusic.play();

            },
            {
                once:true
            }
        );


    });


}



/*
Save every second
*/

setInterval(()=>{


    if(
        bgMusic &&
        !bgMusic.paused
    ){

        saveMusicState();

    }


},1000);    



/* ==========================
   GLOBAL ELEMENTS
========================== */


let heartInterval;


const heartButton =
document.getElementById("startButton");


const clickText =
document.getElementById("clickText");


const stars =
document.querySelector(".stars");


const floatingHearts =
document.getElementById("floatingHearts");






/* ==========================
   FLOATING PARTICLES
========================== */


function createHeart(){


    const particle =
    document.createElement("div");


    particle.className =
    "floating-heart";


    const particles = [

        "✨",
        "✨",
        "⭐",
        "💫",
        "🤍",
        "💖"

    ];



    particle.innerHTML =
    particles[
        Math.floor(
            Math.random()*particles.length
        )
    ];



    particle.style.fontSize =
    (18 + Math.random()*18)+"px";



    particle.style.left =
    Math.random()*window.innerWidth+"px";



    particle.style.top =
    Math.random()*window.innerHeight+"px";



    particle.style.animationDuration =
    (2.5 + Math.random()*1.5)+"s";



    if(floatingHearts){

        floatingHearts.appendChild(
            particle
        );

    }



    setTimeout(()=>{

        particle.remove();

    },4000);


}







/* ==========================
   INDEX PAGE
========================== */


if(heartButton){



    heartButton.addEventListener(
    "mouseenter",
    ()=>{


        if(clickText){

            clickText.innerHTML =
            "Go on... I'm excited too 🫣";

        }

        if(stars){

            stars.classList.add(
                "active"
            );

        }

        heartInterval =
        setInterval(
            createHeart,
            180
        );
    });



    heartButton.addEventListener(
    "mouseleave",
    ()=>{


        if(clickText){

            clickText.innerHTML =
            "Your birthday gift is waiting... ❤️";

        }

        if(stars){

            stars.classList.remove(
                "active"
            );

        }

        clearInterval(
            heartInterval
        );

    });


    heartButton.addEventListener(
    "click",
    ()=>{

        startMusic();

        createHeart();

        setTimeout(()=>{

            saveMusicState();

            window.location.href = "pages/page2.html";

    },3000);
 });
}


/* ==========================
   BALLOONS
========================== */


function createBalloon(){


    const balloon =
    document.createElement("div");


    balloon.className =
    "balloon";


    balloon.innerHTML =
    "🎈";



    balloon.style.left =
    Math.random()*100+"vw";



    balloon.style.animationDuration =
    (4 + Math.random()*3)+"s";



    document.body.appendChild(
        balloon
    );



    setTimeout(()=>{

        balloon.remove();

    },7000);


}


/* ==========================
   PAGE LOGIC
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    /*
       Resume music on page2-page6
    */

   if(
    localStorage.getItem("musicPlaying")
    === "true"
){

    startMusic();

}

    const blowButton =
    document.getElementById(
        "blowButton"
    );



    const candleSection =
    document.querySelector(
        ".candle-section"
    );



    const storyReveal =
    document.querySelector(
        ".story-reveal"
    );



    const storyText =
    document.querySelector(
        ".story-text"
    );



    const continueButton =
    document.getElementById(
        "continueButton"
    );


    /* ==========================
       CANDLE PAGE
    ========================== */


    if(blowButton){



        blowButton.addEventListener(
        "click",
        ()=>{


            const wishTitle =
            document.querySelector(
                ".candle-section h2"
            );



            if(wishTitle){


                wishTitle.style.opacity =
                "0";



                setTimeout(()=>{

                    wishTitle.style.display =
                    "none";

                },500);


            }




            blowButton.style.display =
            "none";






            const birthdayText =
            document.createElement(
                "h2"
            );



            birthdayText.className =
            "birthday-message";



            birthdayText.innerHTML =
            "Happy Birthday Darling! 💫";



            candleSection.appendChild(
                birthdayText
            );






            let balloonInterval;




            for(let i=0;i<10;i++){

                createBalloon();

            }




            balloonInterval =
            setInterval(
                createBalloon,
                250
            );





setTimeout(()=>{


    candleSection.style.display = "none";


    clearInterval(
        balloonInterval
    );


    // Reveal story message after candles
    if(storyReveal){

        storyReveal.style.display = "block";


        setTimeout(()=>{

            storyReveal.style.opacity = "1";

        },100);

    }


    if(storyText){

        storyText.classList.add(
            "show"
        );

    }


    if(continueButton){

        continueButton.classList.add(
            "show"
        );

    }


},5000);

        });
    }


/* ==========================
   STORY PAGES
========================== */


const storyParagraphs = document.querySelectorAll(
    ".story-text .paragraph"
);


const wishParagraphs = document.querySelectorAll(
    ".wish-build-up .wish-line"
);


const memoryParagraphs = document.querySelectorAll(
    ".memory-section .paragraph"
);


const sparkle = document.querySelector(".sparkle");
const littleText = document.querySelector(".little-text");
const wishTime = document.querySelector(".wish-time");

const memoryTitle = document.querySelector(".memory-title");
const memorySection = document.querySelector("#memorySection");



/*
   FIRST STORY SECTION
   (You're kind...
    You're thoughtful...
    etc.)
*/

storyParagraphs.forEach((p, index) => {


    setTimeout(() => {


        p.classList.add("show");


    }, index * 2500);


});

/*
   WISH BUILD UP SECTION
   Starts only after first story finishes
*/

const wishStartDelay = 
(storyParagraphs.length * 1200) + 2000;



wishParagraphs.forEach((p,index)=>{


    setTimeout(()=>{


        p.classList.add("show");



        /*
           Trigger 11:09 reveal
           only after:
           Because I already got mine.
        */

        if(p.classList.contains("trigger-reveal")){


            setTimeout(()=>{


                if(sparkle){

                    sparkle.classList.add("show");

                }


            },1200);



            setTimeout(()=>{


                if(littleText){

                    littleText.classList.add("show");

                }


            },1800);



            setTimeout(()=>{


                if(wishTime){

                    wishTime.classList.add("show");

                }


            },2600);



            /*
               Memory heading appears
            */

            setTimeout(()=>{


                if(memorySection){

                    memorySection.classList.add("show");

                }


                if(memoryTitle){

                    memoryTitle.classList.add("show");

                }


            },5200);



            /*
               Memory paragraphs after heading
            */

            setTimeout(()=>{


                memoryParagraphs.forEach((item,i)=>{


                    setTimeout(()=>{


                        item.classList.add("show");


                    }, i * 700);


                });


            },8200);



        }



    }, wishStartDelay + (index * 1800));


});

/*
   Page2/Page3 story reveal
*/

if (storyText) {

     setTimeout(()=>{

        storyText.classList.add("show");


    },700);
}

/* ==========================
   PAGE NAVIGATION
========================== */

if (continueButton) {

    continueButton.addEventListener("click", () => {

        saveMusicState();

        const path = window.location.pathname;

        if (path.includes("page2")) {

            window.location.href = "page3.html";

        } else if (path.includes("page3")) {

            window.location.href = "page4.html";

        } else if (path.includes("page4")) {

            window.location.href = "page5.html";

        } else if (path.includes("page5")) {

            window.location.href = "page6.html";

        }

    });

}
});