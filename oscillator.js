const WaveForms = {
    noise: (time, pitch) => Math.random() * 2 - 1,
    sin:(time, pitch) => Math.sin(2 * Math.PI * time * pitch),
    square: (time, pitch) => Math.sign(WaveForms.sin(time, pitch)),
    saw: (time, pitch) => {
        const waveLength = 1 / pitch;
        const leftover = time % waveLength;
        const percentage = leftover / waveLength;
        const wave = percentage * 2 - 1;
        return wave;
    },
    triangle: (time, pitch) => Math.abs(WaveForms.saw(time, pitch)) * 2 - 1
}

let multiplier;

//setInterval(() => console.log(multiplier), 10);

class Oscillator {
    constructor(waveForm, buffer, volume) {
        this.waveForm = waveForm;
        this.buffer = buffer;
        this.volume = volume;
    }

    play(pitch, offset, length, envelope) {

        let release = envelope.release || 0;

        let end = this.buffer.length;
        if(offset !== undefined && length !== undefined)
            end = Math.min(this.buffer.length, (offset + length + release) * sampleRate);

        for(let i = offset * sampleRate || 0; i < end; i++) {
            const time = i / sampleRate;

            const amp = this.waveForm(time, pitch);

            multiplier = envelope.envelope(i - offset * sampleRate, length * sampleRate);
            const finalAmp = amp * multiplier * this.volume; 
            this.buffer[i] = finalAmp + this.buffer[i] * 0.8;
        }
    }

    playNotes(notes, tempo, envelope, offset) {

        const barLengthInSeconds = (4 * 60) / (tempo || 120);
        const noteObjects = Notes.parse(twinkleTwinkle);

        function isRest(noteObject) {
            return isNaN(noteObject.pitch);
        }

        let totalOffset = offset || 0;

        for(const noteObject of noteObjects) {        
            if(!isRest(noteObject)) {
                this.play(noteObject.pitch, totalOffset, noteObject.length * barLengthInSeconds, envelope);
            }
            totalOffset += noteObject.length * barLengthInSeconds
        }

    }
}