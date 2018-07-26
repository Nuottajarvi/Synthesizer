"use strict";

//Note form = ['C#', 1/4, 4], [note, length, octave];

const Notes = {
    notes: {
        'C': -9,
        'C#': -8,
        'D': -7,
        'D#': -6,
        'E': -5,
        'F': -4,
        'F#': -3,
        'G': -2,
        'G#': -1,
        'A': 0,
        'A#': 1,
        'Bb': 2,
        'R': undefined
    },

    getPitch: function(note, octave) {
        return Math.pow(2, (octave - 4) + this.notes[note] / 12) * 440;
    },

    parse: function(arr) {
        return arr.map((note) => ({pitch: this.getPitch(note[0], note[2] || 4), length: note[1] || 1/4}));
    }
}