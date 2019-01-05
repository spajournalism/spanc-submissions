var SPANCFolderName = "SPANC19 award submissions";

function handleFormSubmission(e) {
  var values = e.namedValues;
  var category = values["Category"][0];
  var fileNames = parseFileNames(values["Files"][0]);

  var ids = fileNames.map(parseId);

  var awardsFolder = getOrCreateFolder(SPANCFolderName, DriveApp);
  var categoryFolder = getOrCreateFolder(category, awardsFolder);

  ids.forEach(function(id) {
    var file = DriveApp.getFileById(id);
    categoryFolder.addFile(file);
  });
}

function getOrCreateFolder(name, parent) {
  var matches = parent.getFoldersByName(name);

  var folder = undefined;

  if (!matches.hasNext()) {
    folder = parent.createFolder(name);
  } else {
    folder = matches.next();
  }

  return folder;
}

function parseFileNames(str) {
  return str.split(",").map(function(s) {
    return s.trim();
  });
}

function parseId(s) {
  return s.split("=")[1];
}
