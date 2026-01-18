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

  //Capitalize the first letter in the name of exercise
  const exerciseNameRaw = dataForm.get("exercise").trim();
  const exerciseName =
    exerciseNameRaw.charAt(0).toUpperCase() + exerciseNameRaw.slice(1);

  const dataExercises = {
    name: exerciseName,
    weight: dataForm.get("weight"),
    sets: dataForm.get("sets"),
    reps: dataForm.get("reps"),
  };

  //Variables to add the new exercise
  const divNewExercise = document.createElement("div");
  divNewExercise.classList.add("exercise");

  const pen = document.createElement("i");
  pen.classList.add("fa-solid","fa-pen");

  const exerciseInfo = document.createElement("p");
  exerciseInfo.textContent = `${dataExercises.name} ${dataExercises.weight} kg ${dataExercises.sets} x ${dataExercises.reps}`;

  divNewExercise.appendChild(exerciseInfo);
  divNewExercise.appendChild(pen);

  if (currentListExercise) {
    currentListExercise.appendChild(divNewExercise);

    e.target.reset();
    modal.style.display = "none";
  } else {
    alert("The list of current exercises could not be found");
  }
});
