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



        },1200);



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



                candleSection.style.display =
                "none";




                if(storyReveal){


                    storyReveal.style.display =
                    "block";



                    setTimeout(()=>{

                        storyReveal.style.opacity =
                        "1";

                    },100);


                }





                clearInterval(
                    balloonInterval
                );





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


    const paragraphs =
    document.querySelectorAll(
        ".paragraph"
    );



    paragraphs.forEach(
    (p,index)=>{


        setTimeout(()=>{


            p.classList.add(
                "show"
            );


        },index*2500);



    });






    if(storyText){


        setTimeout(()=>{


            storyText.classList.add(
                "show"
            );


        },700);


    }










    /* ==========================
       PAGE NAVIGATION
    ========================== */


    if(continueButton){


        continueButton.addEventListener(
        "click",
        ()=>{


            saveMusicState();



            const path =
            window.location.pathname;





            if(path.includes("page2")){


                window.location.href =
                "page3.html";


            }

            else if(path.includes("page3")){


                window.location.href =
                "page4.html";


            }

            else if(path.includes("page4")){


                window.location.href =
                "page5.html";


            }

            else if(path.includes("page5")){


                window.location.href =
                "page6.html";


            }




        });



    }



});