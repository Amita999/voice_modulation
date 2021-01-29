  
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
  
  
  var noteTextarea = $('#note-textarea');
  var instructions = $('#recording-instructions');
  var notesList = $('ul#notes');
  
  var noteContent = '';
  
  // Get all notes from previous sessions and display them.
  var notes = getAllNotes();
  renderNotes(notes);
   
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

      saveNote(new Date().toLocaleString(), noteContent);

      
  
      // Reset variables and update UI.
      noteContent = '';
      renderNotes(getAllNotes());
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

    //Download note
    // if(target.hasClass('download-note')) {
    //     var content = target.closest('.note').find('.content').text();
    //     download(content);
    //     // var dateTime = target.siblings('.date').text();  
    //     // deleteNote(dateTime);
    //     // target.closest('.note').remove();
    //   }


  });
  

  
  function readOutLoud(message) {
      var speech = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
  
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
    if(notes.length) {
      notes.forEach(function(note) {
        html+= `<li class="list-group-item note">
        <p heading>
        <p style="margin-right: 2.5em" class="content">${note.content}</p>
        </p>
        <button type="button" class="btn btn-outline-primary listen-note">Listen to Recording</button>
        <button type="button" class="btn btn-outline-primary delete-note" id ="delete-note">Delete </button>
        <button type="button" class="btn btn-outline-primary download-note">Download Recording</button>
      </p>
        </li>`;     
      });
    }
    else {
      html = '<li class="list-group-item"><p class="content">You don\'t have any notes yet.</p></li>';
    }
    notesList.html(html);
  }
  
  
  function saveNote(dateTime, content) {
    localStorage.setItem('note-' + dateTime, content);
  }
  
  
  function getAllNotes() {
    var notes = [];
    var key;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
  
      if(key.substring(0,5) == 'note-') {
        notes.push({
          date: key.replace('note-',''),
          content: localStorage.getItem(localStorage.key(i))
        });
      } 
    }
    return notes;
  }
  
  
  function deleteNote(dateTime) {
    console.log("iNSIDE delete note");
    localStorage.removeItem('note-' + dateTime); 
  }

  // function download(content){
      
  // }
  
  