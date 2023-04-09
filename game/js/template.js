function sceneTemplate(scene) {
    return `
    <div data-id="${scene.id}" class="scene">
    <div class="barrier fixed">
         <div class="background"></div>
        <span class="fixed">Барьер!</span>
    </div>
    
   ${scene.objectItem && `<img class="${scene.objectItem.class}" src="${scene.objectItem.image}">`}

    <div class="quiz fixed none">
        <h2 class="quiz__question">${scene.question}</h2>
        <div data-id=${scene.answers[0].id} class="quiz__answer">${scene.answers[0].answer}</div>
        <div data-id=${scene.answers[1].id} class="quiz__answer">${scene.answers[1].answer}</div>
        <div data-id=${scene.answers[2].id} class="quiz__answer">${scene.answers[2].answer}</div>
        <div data-id=${scene.answers[3].id} class="quiz__answer">${scene.answers[3].answer}</div>
        <div class="quiz__close">&#10006;</div>
    </div>

    <img class="game__img" src="${scene.image}" alt="">
    
</div>
    `
}