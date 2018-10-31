autocomplete({
  input: document.getElementById("autocomplete"),
  fetch: function(text, update) {
    text = text.toLowerCase();
    // Fetch call and set it in input with update callback
    update();
  },
  onSelect: function(item) {
    alert(item.value);
  }
});
