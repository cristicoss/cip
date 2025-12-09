document.addEventListener("alpine:init", () => {
  Alpine.store("demo", {
    message: "Salut, Alpine funcționează!",
  });
});
