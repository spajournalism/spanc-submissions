SPANCFolderName = 'SPANC19 award submissions';

function handleFormSubmission(e) {
  var values = e.namedValues;
  var category = values['Category'];
  var fileNames = values['Files'];
  
  console.log("File names: " + fileNames);
  console.log('Is array: ' + Array.isArray(fileNames));

  // @TODO - This doesn't work properly for some reason
  var ids = fileNames.map(parseId);
  
  console.log("IDs: " + ids);
  
  var awardsFolder = getOrCreateFolder(SPANCFolderName, DriveApp);
  var categoryFolder = getOrCreateFolder(category, awardsFolder);
  
  ids.forEach(function(id) {
     console.log('Adding ID: ' + id);
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

function parseId(s) {
  console.log('Parsing: ' + s);
  console.log('Split: ' + s.split('='));
  return s.split('=')[1];
}
