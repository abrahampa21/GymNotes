//Persistance
function getAllExercises() {
  const lists = document.querySelectorAll(".list-exercises");
  const routines = [];

  lists.forEach((list, index) => {
    const exercises = [];

    list.querySelectorAll(".exercise").forEach((ex) => {
      exercises.push({
        name: ex.dataset.name,
        weight: ex.dataset.weight,
        sets: ex.dataset.sets,
        reps: ex.dataset.reps,
      });
    });

    routines.push({ routineIndex: index, exercises });
  });

  return routines;
}

//Create an exercise
function createExercise({ name, weight, sets, reps }, list) {
  const divNewExercise = document.createElement("div");
  divNewExercise.classList.add("exercise");

  divNewExercise.dataset.name = name;
  divNewExercise.dataset.weight = weight;
  divNewExercise.dataset.sets = sets;
  divNewExercise.dataset.reps = reps;

  const exerciseInfo = document.createElement("p");
  exerciseInfo.classList.add("exercise-info");
  exerciseInfo.innerHTML = `${name} ${weight} kg ${sets} <span>x</span> ${reps}`;

  const pen = document.createElement("i");
  pen.classList.add("fa-solid", "fa-pen");

  const xMark = document.createElement("i");
  xMark.classList.add("fa-solid", "fa-x");

  const divIcons = document.createElement("div");
  divIcons.classList.add("div-icons");

  pen.addEventListener("click", () => {
    modal.style.display = "flex";

    formExercise.exercise.value = name;
    formExercise.weight.value = weight;
    formExercise.sets.value = sets;
    formExercise.reps.value = reps;

    formExercise.dataset.editing = "true";
    formExercise.currentExercise = divNewExercise;
  });

  xMark.addEventListener("click", () => {
    divNewExercise.remove();
    window.api.saveExercises(getAllExercises());
  });

  divIcons.appendChild(pen);
  divIcons.appendChild(xMark);

  divNewExercise.appendChild(exerciseInfo);
  divNewExercise.appendChild(divIcons);

  list.appendChild(divNewExercise);
}

//Variables for modal
const modal = document.getElementById("modal");
const addButton = document.querySelectorAll(".btn-add");
const closeModal = document.getElementById("close-modal");

//Form
const formExercise = document.getElementById("form-exercise");
let currentListExercise = null;

//UI events
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
  if (e.target === modal) modal.style.display = "none";
});

//Submit on form
formExercise.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataForm = new FormData(e.target);

  const name =
    dataForm.get("exercise").trim().charAt(0).toUpperCase() +
    dataForm.get("exercise").trim().slice(1);

  const weight = dataForm.get("weight");
  const sets = dataForm.get("sets");
  const reps = dataForm.get("reps");

  //Editing
  if (formExercise.dataset.editing === "true") {
    const exercise = formExercise.currentExercise;

    exercise.dataset.name = name;
    exercise.dataset.weight = weight;
    exercise.dataset.sets = sets;
    exercise.dataset.reps = reps;

    exercise.querySelector("p").innerHTML =
      `${name} ${weight} kg ${sets} <span>x</span> ${reps}`;

    window.api.saveExercises(getAllExercises());

    delete formExercise.dataset.editing;
    formExercise.currentExercise = null;

    e.target.reset();
    modal.style.display = "none";
    return;
  }

  // Create a new one
  if (currentListExercise) {
    createExercise({ name, weight, sets, reps }, currentListExercise);
    window.api.saveExercises(getAllExercises());
    e.target.reset();
    modal.style.display = "none";
  }
});

// Charging data 
window.addEventListener("DOMContentLoaded", async () => {
  const routines = await window.api.loadExercises();

  routines.forEach(({ routineIndex, exercises }) => {
    const list = document.querySelectorAll(".list-exercises")[routineIndex];
    if (!list) return;

    exercises.forEach((exercise) => {
      createExercise(exercise, list);
    });
  });
});
