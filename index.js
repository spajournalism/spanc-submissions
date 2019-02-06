var SPANCFolderName = "SPANC19 award submissions";

function handleFormSubmission(e) {
  var values = e.namedValues;
  var category = values["Category"][0];
  var fileNames = parseFileNames(values["Files"][0]);

  var ids = fileNames.map(parseId);

  var awardsFolder = getOrCreateFolder(SPANCFolderName, DriveApp);
  var categoryFolder = getOrCreateFolder(category, awardsFolder);
  var subFolder = getOrCreateFolder(entrantOrPublication(category, values), categoryFolder);

  ids.forEach(function(id) {
    var file = DriveApp.getFileById(id);
    subFolder.addFile(file);
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

function entrantOrPublication(category, values) {
  var entrant = values["Name of entrant"][0];
  var publication = values["Publication"][0];
  
  switch (category) {
    case "Best Publication":
    case "Best Website":
    case "Best Newspaper Design":
    case "Best Magazine Design":
    case "Best Overall Digital Media":
    case "Best Sports Coverage":
    case "Best Newcomer Publication":
    case "Best Specialist Publication":
    case "Best Science Publication or Section":
      return publication;
     
    case "Billy Dowling-Reid Award for Outstanding Commitment":
    case "Best Reporter":
    case "Best Lifestyle Story":
    case "Best Science/Technology Story":
    case "Best Human Rights Journalist":
    case "Best Human Rights Story":
    case "Best News Story":
    case "Best Feature":
    case "Best Interview":
    case "Best Entertainment Piece":
    case "Best Comment or Opinion":
    case "Best Student Photographer":
      return entrant;
    
    default:
      return entrant;
  }
}
