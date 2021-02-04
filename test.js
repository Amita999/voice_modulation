// import ttsf from 'text-to-speech-file';
var { synthesize } = require("text-to-speech-file")

// import { synthesize } from 'text-to-speech-file';

synthesize('hello from shrotavre!', `${__dirname}/sample-speech.mp3`)
// Default options:
// options = {
//   stdio: [0, 1, 2], // set child process stdio
//   log: false,       // enable log
//   retries: 8,       // set speech synthesis retries
//   acodec: 'copy',   // set audio acodec
//   audio: {
//     encoding: 'MP3',     // set audio encoding
//     frequency: 0,        // set audio frequency/sample rate
//   },
//   language: {
//     code: 'en-US'        // set language code
//   },
//   voice: {
//     name: null,          // set voice name
//     gender: 'NEUTRAL',    // set voice SSML gender
//     pitch: 0.0,          // set voice pitch change
//     rate: 1.0,           // set voice speaking rate
//     volume: 0.0,         // set voice volume gain in dB
//   },
//   quote: {
//     break: 250,          // set quoted text break time
//     emphasis: 'moderate' // set quoted text emphasis level
//   },
//   heading: {
//     break: 4000,         // set heading text break time
//     difference: 250,     // set heading text break difference
//     emphasis: 'strong',  // set heading text emphasis level
//   },
//   ellipsis: {
//     break: 1500          // set ellipsis break time
//   },
//   dash: {
//     break: 500           // set dash break time
//   },
//   newline: {
//     break: 1000          // set newline break time
//   },
//   block: {
//     separator: '.',       // set block separator
//     length: 5000,        // set block length
//   },
//   config: null, // set GCP/AWS config
//   params: null  // set synthesize speech parameters "directly"
// }