"use strict";
const sampleRate = 44100;

const twinkleTwinkle = [["C"], ["C"], ["G"], ["G"], ["A"], ["A"], ["G", 1/2], ["F"], ["F"], ["E"], ["E"], ["D"], ["D"], ["C", 1/2]];

function audio() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const myArrayBuffer = audioCtx.createBuffer(2, sampleRate * 30, sampleRate);
    
    for(var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
        const bufferingChannel = myArrayBuffer.getChannelData(channel);
        
        //noise(bufferingChannel);
        const osc = new Oscillator(WaveForms.triangle, bufferingChannel, 0.5);
        const envelope = new Envelope(0.25, 0, 1, 0.5);

        osc.playNotes(twinkleTwinkle, 120, envelope);
    }
    var source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;

    var gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start();
}