var app = require('app'); //module to control application life
var BrowserWindow = require('browser-window'); // module to create native browser window

// Report crashes to our server
require('crash-reporter').start();

// Keepa global reference of the window object, if you don't, the window will
// be closed automatically when the javascript obj is GCed
var mainWindow = null;

// Quit when all windows are closed
app.on('window-all-closed', function(){
  if (process.platform != 'darwin')
    app.quit();
});


// This method will be called when the atom shell has done everything
// initializing and ready for creating browser.
app.on('ready', function(){
  // create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "YOUR APP TITLE GOES HERE!"
  });

  // and load the index.html of the app
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function(){
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
