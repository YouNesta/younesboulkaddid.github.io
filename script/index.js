const API_KEY = "94aa474c51b0af052d05ef4c25e81c43";
function deleteLine(id) {
  console.log(id);
  let line = document.getElementById(id);
  line.parentNode.removeChild(line);
}
autocomplete({
  input: document.getElementById("autocomplete"),
  fetch: function(text, update) {
    text = encodeURI(text);

    axios
      .get(
        `
        https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&page=1
        `
      )
      .then(function(response) {
        if (response && response.data && response.data.results.length >= 1) {
          let suggestions = response.data.results.map(movie => {
            let { title } = movie;
            return { label: title, value: title };
          });
          update(suggestions);
        } else {
          let txt = "Not found";
          let suggestions = { label: txt, value: txt };
          update(suggestions);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  onSelect: function(item) {
    let tableau = document.getElementById("tableau");

    //Create a full line for a single movie
    let line = document.createElement("tr");
    line.id = encodeURI(item.value);

    // Create one cells by elements
    let CheckCells = document.createElement("td");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.value = encodeURI(item.value);

    // Add the checkbox in his cells
    CheckCells.appendChild(checkBox);

    // Add the cells to the line
    line.appendChild(CheckCells);

    let NameCells = document.createElement("td");
    let movieName = document.createTextNode(item.value);
    // Set the name in his cells
    NameCells.appendChild(movieName);
    line.appendChild(NameCells);

    let DeleteCells = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.onclick = () => deleteLine(encodeURI(item.value));
    let buttonText = document.createTextNode("DELETE");
    deleteButton.appendChild(buttonText);
    DeleteCells.appendChild(deleteButton);
    line.appendChild(DeleteCells);

    tableau.appendChild(line);
  }
});
