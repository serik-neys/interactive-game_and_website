const game = document.querySelector(".game")
const wrapper = document.querySelector(".wrapper")

const audio = document.querySelector(".audio-bg")
const button = document.querySelector(".play")

const btnLeft = document.querySelector(".btn__left")
const btnRight = document.querySelector(".btn__right")

const closeControl = document.querySelector(".control__close")

const browserWidth = document.body.clientWidth

let fps = 75
let cloudSpeedMax = 6 //px
let cloudSpeedMin = 4
let cloudX = 100
let cloudAll = [
    { id: 1, x: 0, speed: getRandom(cloudSpeedMin, cloudSpeedMax) },
    { id: 2, x: 0, speed: getRandom(cloudSpeedMin, cloudSpeedMax) },
    { id: 3, x: 0, speed: getRandom(cloudSpeedMin, cloudSpeedMax) },
]


let currentScene = 0

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function calculateProcent() {
    return (100 / scenes.length) * currentScene
}

const init = () => {

    sceneCreate()
    cloudCreate()

    addListener()

    setInterval(() => {
        cloudLogic()
    }, fps)

}

// SCENE START

function sceneCreate() {
    wrapper.style.width = `${scenes.length * 100}%`
    scenes.forEach(scene => {
        wrapper.insertAdjacentHTML("beforeend", sceneTemplate(scene))
    })
    //disable btn loading scene
    sceneCheck()
}



function sceneLogicRight() {
    console.log(1);
    if (currentScene >= scenes.length - 1) {
        btnRight.classList.add("disable")
    } else {
        btnRight.classList.remove("disable")
        currentScene++;
        wrapper.style.transform = `translateX(-${calculateProcent()}%)`

    }
    sceneCheck()
}

function sceneLogicLeft() {
    if (currentScene === 0) {
        btnLeft.classList.add("disable")
    } else {
        btnLeft.classList.remove("disable")
        currentScene--;
        wrapper.style.transform = `translateX(-${calculateProcent()}%)`
    }
    sceneCheck()
}

function sceneCheck() {
    if (scenes[currentScene].status) {
        btnRight.classList.remove("disable")
    } else {
        btnRight.classList.add("disable")
    }
}

//SCENE END


// AUDIO START

function AudioGame(name) {
    switch (name) {
        case "popup":
            new Audio("audio/popup.mp3").play()
            break;
        case "correct":
            new Audio("audio/correct.mp3").play()
            break;
        case "uncorrect":
            new Audio("audio/uncorrect.mp3").play()
            break;
        case "animal":
            new Audio("audio/animal.mp3").play()
            break;
        default:
            break;
    }
}

//AUDIO END

// CLOUD START

function cloudCreate() {
    cloudAll.forEach((cloud) => {
        game.insertAdjacentHTML("beforeend",
            `<img class="cloud" src="images/item.png" alt="">`)
        cloud.x = getRandom(0, browserWidth)
    })

}


function cloudLogic() {
    const clouds = document.querySelectorAll(".cloud")

    if (clouds) {
        clouds.forEach((cloud, index) => {
            let currentCloud = cloudAll[index]
            cloud.style.left = `${currentCloud.x += currentCloud.speed}px`

            if (cloud.offsetLeft > browserWidth) {
                currentCloud.x = cloud.clientWidth * -1
                console.log(cloud.offsetLeft, browserWidth);
            }
        })
    }
}

//CLOUD END

//animal sound start

function animalSoundListener() {
    const animals = document.querySelectorAll(".game__object")
    animals.forEach(animal => {
        animal.addEventListener("click", () => AudioGame("animal"))
    })
}

//animal sound end


//QUIZ START

function openQuizListener() {
    const barrierAll = document.querySelectorAll(".barrier")
    barrierAll.forEach(barrier => {
        barrier.addEventListener("click", () => {
            AudioGame("popup")

            const quiz = barrier.closest(".scene").querySelector(".quiz")
            barrier.classList.add("none")
            quiz.classList.remove("none")

        })
    })
}

function closeQuizLstener() {
    const quizCloseBtn = document.querySelectorAll(".quiz__close")
    quizCloseBtn.forEach((close) => {
        close.addEventListener("click", () => {
            AudioGame("popup")

            const quiz = close.closest(".quiz")
            const barrier = quiz.closest(".scene").querySelector(".barrier")

            barrier.classList.remove("none")
            quiz.classList.add("none")
        })
    })
}


function quizLogic(e) {
    if (e.target.classList.contains("quiz__answer")) {
        const id = e.target.dataset.id
        const current = scenes[currentScene]
        const answer = e.target
        const currentQuiz = e.target.closest(".quiz")

        if (id == current.rightAnswer) {
            AudioGame("correct")

            answer.classList.add("yes")
            btnRight.classList.remove("disable")
            current.status = true


            setTimeout(() => {
                AudioGame("popup")
                currentQuiz.classList.add("remove")

            }, 2000)
        } else {
            AudioGame("uncorrect")
            answer.classList.add("no")
            setTimeout(() => answer.classList.remove("no"), 600)

        }

        //WIN LOGIC
        if (id == current.rightAnswer && currentScene === scenes.length - 1) {
            alert("Вы прошли игру!")
        }

    }
}

//LISTENER
function addListener() {

    wrapper.addEventListener("click", (e) => quizLogic(e))
    btnRight.addEventListener("click", sceneLogicRight)
    btnLeft.addEventListener("click", sceneLogicLeft)
    button.addEventListener("click", () => audio.play())
    closeControl.addEventListener("click", () => document.querySelector(".game__controll").classList.toggle("close-all"))

    animalSoundListener()
    openQuizListener()
    closeQuizLstener()
}


window.addEventListener("load", init)