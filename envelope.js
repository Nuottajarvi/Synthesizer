"use strict";

class Envelope {
    constructor(attack, decay, sustain, release) {
        this.attack = attack * sampleRate;
        this.decay = decay * sampleRate;
        this.sustain = sustain;
        this.release = release * sampleRate;

        this.attackExp = 1;
        this.decayExp = 1;
        this.releaseExp = 1;
    }

    envelope(time, length) {
        this.t = time;
        this.l = length;
        if(time > length) {
            //release
            const percentage = (time - length) / this.release;
            const y = Math.pow(percentage, this.releaseExp);
            return Math.max(this.sustain - y * this.sustain, 0);
        } else if(time < this.attack) {
            //attack
            const percentage = time / this.attack;
            return Math.pow(percentage, this.attackExp); 
        } else if (time < this.attack + this.decay) {
            //decay
            const percentage = (time - this.attack) / this.decay;
            const amount = Math.pow(percentage, this.decayExp);
            return 1 - amount * (1 - this.sustain);
        } else {
            //sustain
            return this.sustain;
        }
    }
}