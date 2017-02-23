'use strict';

export let audioContext = new(window['AudioContext'] || window['webkitAudioContext'])();