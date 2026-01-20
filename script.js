//Variables for modal
const modal = document.getElementById("modal");
const addButton = document.querySelectorAll(".btn-add");
const closeModal = document.getElementById("close-modal");
//Form
const formExercise = document.getElementById("form-exercise");
let currentListExercise = null;

addButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cardRoutine = btn.closest(".card-routine");
    currentListExercise = cardRoutine.querySelector(".list-exercises");

    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

formExercise.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataForm = new FormData(e.target);

  //Capitalize the first letter
  const name =
    dataForm.get("exercise").trim().charAt(0).toUpperCase() +
    dataForm.get("exercise").trim().slice(1);

  const weight = dataForm.get("weight");
  const sets = dataForm.get("sets");
  const reps = dataForm.get("reps");

  if (formExercise.dataset.editing == "true") {
    const exercise = formExercise.currentExercise;

    exercise.dataset.name = name;
    exercise.dataset.weight = weight;
    exercise.dataset.sets = sets;
    exercise.dataset.reps = reps;

    exercise.querySelector("p").textContent =
      `${name} ${weight} kg ${sets} x ${reps}`;

    delete formExercise.dataset.editing;
    formExercise.currentExercise = null;

    e.target.reset();
    modal.style.display = "none";
  } else {
    //If it is a new exercise
    //Variables to add the new exercise
    const divNewExercise = document.createElement("div");
    divNewExercise.classList.add("exercise");

    //Storing values
    divNewExercise.dataset.name = name;
    divNewExercise.dataset.weight = weight;
    divNewExercise.dataset.sets = sets;
    divNewExercise.dataset.reps = reps;

    const exerciseInfo = document.createElement("p");
    exerciseInfo.textContent = `${name} ${weight} kg ${sets} x ${reps}`;

    const pen = document.createElement("i");
    pen.classList.add("fa-solid", "fa-pen");

    pen.addEventListener("click", () => {
      modal.style.display = "flex";

      //Current values
      formExercise.exercise.value = divNewExercise.dataset.name;
      formExercise.weight.value = divNewExercise.dataset.weight;
      formExercise.sets.value = divNewExercise.dataset.sets;
      formExercise.reps.value = divNewExercise.dataset.reps;

      //Save if an exercise is editing
      formExercise.dataset.editing = "true";
      formExercise.currentExercise = divNewExercise;
    });

    divNewExercise.appendChild(exerciseInfo);
    divNewExercise.appendChild(pen);

    if (currentListExercise) {
      currentListExercise.appendChild(divNewExercise);

      e.target.reset();
      modal.style.display = "none";
    } else {
      alert("The list of current exercises could not be found");
    }
  }
});
