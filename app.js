// requirejs.config({
//   //By default load any module IDs from js/lib
//   baseUrl: 'js/lib',
//   //except, if the module ID starts with "app",
//   //load it from the js/app directory. paths
//   //config is relative to the baseUrl, and
//   //never includes a ".js" extension since
//   //the paths config could be for a directory.
//   paths: {
//       app: '../app'
//   }
// });

// // Start the main app logic.
// requirejs(['jquery', 'canvas', 'app/sub'],
// function   ($,        canvas,   sub) {
//   //jQuery, canvas and the app/sub module are all
//   //loaded and can be used here now.
// });


try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
  
 

// function convertMP3(note){
//   textToMp3.getMp3(note, function(err, binaryStream){
//     if(err){
//       console.log(err);
//       return;
//     }
//     var file = fs.createWriteStream("output.mp3"); // write it down the file
//     file.write(binaryStream);
//     file.end();
//   });
// }


function createDownloadLink(blob, encoding) {
  var url = URL.createObjectURL(blob);
  var au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');
  //add controls to the "audio" element 
  au.controls = true;
  au.src = url; //link the a element to the blob 
  link.href = url;
  link.download = new Date().toISOString() + '.' + encoding;
  link.innerHTML = link.download;
  //add the new audio and a elements to the li element 
  li.appendChild(au);
  li.appendChild(link); //add the li element to the ordered list 
  recordingsList.appendChild(li);
}

function convertMP3(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:audio/wav' + encodeURIComponent(audio/wav));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// // Start file download.
// download("hello.txt","This is the content of my file :)");


  
  var noteTextarea = $('#note-textarea');
  var instructions = $('#recording-instructions');
  var notesList = $('ul#notes');
  
  var noteContent = '';
  
  // Get all notes from previous sessions and display them.
  // var notes = getAllNotes();
  // renderNotes(notes);
   
  // If false, the recording will stop after a few seconds of silence.
  // When true, the silence period is longer (about 15 seconds),
  // allowing us to keep recording even when the user pauses. 
  recognition.continuous = true;
  
  // This block is called every time the Speech APi captures a line. 
  recognition.onresult = function(event) {
  

    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
    if(!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
    }
  };
  
  recognition.onstart = function() { 
    instructions.text('Voice recognition activated. Try speaking into the microphone.');
  }
  
  recognition.onspeechend = function() {
    instructions.text('You were quiet for a while so voice recognition turned itself off.');
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      instructions.text('No speech was detected. Try again.');  
    };
  }
  
 
 //input using jQuery 
  $('#start-record-btn').on('click', function(e) {
    if (noteContent.length) {
      noteContent += ' ';
    }
    recognition.start();
  });
  
  
  $('#pause-record-btn').on('click', function(e) {
    recognition.stop();
    instructions.text('Voice recognition paused.');
  });
  
  // Sync the text inside the text area with the noteContent variable.
  noteTextarea.on('input', function() {
    noteContent = $(this).val();
  })
  
  $('#save-note-btn').on('click', function(e) {
    recognition.stop();
  
    if(!noteContent.length) {
      instructions.text('Could not save empty note. Please add a message to your note.');
    }
    else {
      // Save recording to localStorage.

      // saveNote(new Date().toLocaleString(), noteContent);

      
  
      // Reset variables and update UI.
   
      //////change to be made here
      // renderNotes(getAllNotes());
      renderNotes(noteContent);
      noteContent = '';
      noteTextarea.val('');
      instructions.text('Recording saved successfully.');
    }
        
  })
  
  
  notesList.on('click', function(e) {
    e.preventDefault();
    var target = $(e.target);
  
    // Listen to the selected note.
    if(target.hasClass('listen-note')) {
      var content = target.closest('.note').find('.content').text();
      readOutLoud(content);
    }
  
    // Delete note.
    if(target.hasClass('delete-note')) {
      var dateTime = target.siblings('.date').text();   
      deleteNote(dateTime);
      target.closest('.note').remove();
    }

    // Download note
    if(target.hasClass('download-note')) {
        var content = target.closest('.note').find('.content').text();
        convertMP3("new_1",content);
        // download(content);
        // var dateTime = target.siblings('.date').text();  
        // deleteNote(dateTime);
        // target.closest('.note').remove();
      }


  });
  

  
  function readOutLoud(message) {
    var voices = window.speechSynthesis.getVoices();
      var speech = new SpeechSynthesisUtterance();
     
  
    // Set the text and voice attributes.
    speech.voice = voices[3];
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1.5;
      speech.pitch = 6.5;
    
      window.speechSynthesis.speak(speech);
  }

  function renderNotes(notes) {
    var html = '';
    if(notes) {
      console.log("notes: ",notes);
      // notes.forEach(function(note) {
        html+= `<li class="list-group-item note">
        <p heading>
        <p style="margin-right: 2.5em" class="content">${notes}</p>
        </p>
        <button type="button" class="btn btn-outline-primary listen-note">Listen to Recording</button>
        <button type="button" class="btn btn-outline-primary delete-note" id ="delete-note">Delete </button>
        <button type="button" class="btn btn-outline-primary download-note">Download Recording</button>
      </p>
        </li>`;     
      // } 
      // );
    }
    else {
      html = '<li class="list-group-item"><p class="content">You don\'t have any notes yet.</p></li>';
    }
    notesList.html(html);
  }
  
  
  // function saveNote(dateTime, content) {
  //   localStorage.setItem('note-' + dateTime, content);
  // }
  
  
  // function getAllNotes() {
  //   var notes = [];
  //   var key;
  //   for (var i = 0; i < localStorage.length; i++) {
  //     key = localStorage.key(i);
  
  //     if(key.substring(0,5) == 'note-') {
  //       notes.push({
  //         date: key.replace('note-',''),
  //         content: localStorage.getItem(localStorage.key(i))
  //       });
  //     } 
  //   }
  //   return notes;
  // }
  
  
  function deleteNote(dateTime) {
    console.log("iNSIDE delete note");
    localStorage.removeItem('note-' + dateTime); 
  }

  // function download(content){
      
  // }
  
  