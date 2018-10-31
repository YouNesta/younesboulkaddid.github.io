import autocomplete from "autocompleter";

var countries = [
  { label: "United Kingdom", value: "UK" },
  { label: "United States", value: "US" }
];

autocomplete({
  input: document.getElementById("autocomplete"),
  fetch: function(text, update) {
    text = text.toLowerCase();
    // you can also use AJAX requests instead of preloaded data
    var suggestions = countries.filter(n =>
      n.label.toLowerCase().startsWith(text)
    );
    update(suggestions);
  },
  onSelect: function(item) {
    alert(item.value); // will display 'US' or 'UK'
  }
});
