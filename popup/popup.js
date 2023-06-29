function loadList() {
  const requestStorage = browser.storage.local.get();
  requestStorage.then(function (storageRecieved) {
    storage = storageRecieved;
    Object.entries(storageRecieved).forEach(([key, value]) => {
      document.getElementById("notes-list").innerHTML +=
        `<div class="note-list-obj">
                <h4>
                <a
                    href="` +
        key +
        `"
                    >` +
        key +
        `</a
                >
                </h4>
                <p>` +
        value +
        `</p>
            </div><br>`;
    });
  });
}

document.getElementById("new").addEventListener("click", () => {
  document.getElementById("notes-list-div").hidden = true;
  document.getElementById("edit-note-div").hidden = false;
});

document.getElementById("save").addEventListener("click", () => {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    storage[tabs[0].url] = document.getElementById("note-insert").value;
    browser.storage.local.set(storage);
    loadList();
    document.getElementById("notes-list-div").hidden = false;
    document.getElementById("edit-note-div").hidden = true;
  });
});

loadList();
