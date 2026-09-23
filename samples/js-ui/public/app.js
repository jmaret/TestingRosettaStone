// Increment the on-page counter (used by the navigate smoke path as a live control)
const increment = document.getElementById("increment");
const countOut = document.getElementById("count");
if (increment && countOut) {
  increment.addEventListener("click", () => {
    countOut.textContent = String(Number(countOut.textContent ?? "0") + 1);
  });
}

// Client-side required-name check — the form-validation UX scenario asserts this message
const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");
const success = document.getElementById("success");
const thanksName = document.getElementById("thanks-name");
if (form && nameInput && nameError && success && thanksName) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const empty = nameInput.value.trim() === "";
    nameError.hidden = !empty;
    success.hidden = empty;
    if (!empty) {
      // textContent, never innerHTML — markup in the name must not run
      thanksName.textContent = nameInput.value.trim();
    }
  });
}
