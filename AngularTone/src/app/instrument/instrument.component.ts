import { Component, OnInit } from '@angular/core';
import {
  marioSamples,
  drumSamples,
  DrumPattern,
  ClapPattern
} from './notes.const';
import * as Tone from 'tone';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit {
  notes: string[] = [];
  pattern: string[] = [];
  isTransportStarted: boolean = false;
  volume: any;
  drumMachine: any;
  bassPart: any;
  noise: any;
  sampler: any;
  snareSample: any;
  snareTrack: any;
  kickSample: any;
  kickTrack: any;
  hiHatSample: any;
  hiHatTrack: any;
  clapSample: any;
  clapTrack: any;
  step: any;
  vel: any;
  blocks: { color: string, state: boolean }[] = [];
  blockSize = 16;

  constructor() { }

  ngOnInit(): void {
    //this.synth = new Tone.Synth().toDestination();
    this.notes = ['C3'];
    this.volume = new Tone.Volume(-10);
    this.pattern = [];
    this.initializeDrumMachine();
    this.initializeSnareSample();
    this.initializeKickSample();
    this.initializeHiHatSample();
    this.initializeClapSample();
    for (let index = 0; index < this.blockSize; index++) {
      this.blocks.push({
        color: 'grey',
        state: true
      });
    }
  }

  

  public changeState(index: number) {
    this.blocks[index] = (this.blocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: false
    } : {
      color: 'grey',
      state: true
    };
  }

  private initializeDrumMachine() {
    this.sampler = new Tone.Sampler({
      C3: '../../assets/Kick.wav',
      D3: '../../assets/Snare.wav',
      E3: '../../assets/ClosedHat.wav',
      F3: '../../assets/Clap.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeSnareSample() {
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/Snare.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeKickSample() {
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/Kick.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeHiHatSample() {
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/ClosedHat.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeClapSample() {
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/Clap.wav'
    }).chain(this.volume, Tone.Destination);
  }


  toggleSnare() {
    if (this.snareTrack) {
      this.snareTrack.mute = !this.snareTrack.mute;
    } else {
      this.snareTrack = this.snareSample;
    this.snareTrack = new Tone.Part((time, chord) => {
      this.snareSample.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.snareTrack);
   }
  }
  toggleKick() {
    if (this.kickTrack) {
      this.kickTrack.mute = !this.kickTrack.mute;
    } else {
      this.kickTrack = this.kickSample;
    this.kickTrack = new Tone.Part((time, chord) => {
      this.kickSample.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.kickTrack);
   }
  }
  toggleHiHat() {
    if (this.hiHatTrack) {
      this.hiHatTrack.mute = !this.hiHatTrack.mute;
    } else {
      this.hiHatTrack = this.hiHatSample;
    this.hiHatTrack = new Tone.Part((time, chord) => {
      this.hiHatSample.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.hiHatTrack);
   }
  }

  toggleClap() {
    if (this.clapTrack) {
      this.clapTrack.mute = !this.clapTrack.mute;
    } else {
      this.clapTrack = this.clapSample;
    this.clapTrack = new Tone.Part((time, note) => {
      this.clapSample.triggerAttackRelease("C3", "16n", time, note.velocity );
    }, ClapPattern);
    this.playPart(this.clapTrack);
   }
 }


  playNote(note: string) {
    this.sampler.triggerAttack(note);
  }

  private playPart(part: { start: (arg0: number) => void; loop: boolean; loopEnd: string; }) {
    if (!this.isTransportStarted) {
      Tone.Transport.toggle();
      this.isTransportStarted = true;
      Tone.Transport.bpm.value = 190;
    }

    part.start(0);
    part.loop = true;
    part.loopEnd = '2m';
  }

  private playSample(sampleName: string) {
    new Tone.Player({
      url: `../../assets/${sampleName}.wav`,
      autostart: true
    }).chain(this.volume, Tone.Destination);
  }

  playKick() {
    this.playSample('Kick');
  }
  playSnare() {
    this.playSample('Snare');
  }
  playClosedHat() {
    this.playSample('ClosedHat');
  }
  playClap() {
    this.playSample('Clap');
  }
}

