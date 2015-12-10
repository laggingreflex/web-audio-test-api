import utils from "./utils";
import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

let immigration = Immigration.getInstance();

export default class BiquadFilterNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "BiquadFilterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.JSONKeys = BiquadFilterNode.$JSONKeys.slice();
  }

  @props.enum([ "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass" ])
  type() {}

  @props.audioparam(350)
  frequency() {}

  @props.audioparam(0)
  detune() {}

  @props.audioparam(1)
  Q() {}

  @props.audioparam(0)
  gain() {}

  getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
    this._.inspector.describe("getFrequencyResponse", ($assert) => {
      $assert(utils.isInstanceOf(frequencyHz, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(frequencyHz, "frequencyHz", "Float32Array")}
        `);
      });

      $assert(utils.isInstanceOf(magResponse, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(magResponse, "magResponse", "Float32Array")}
        `);
      });

      $assert(utils.isInstanceOf(phaseResponse, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(phaseResponse, "phaseResponse", "Float32Array")}
        `);
      });
    });
  }
}

BiquadFilterNode.$JSONKeys = [
  "type",
  "frequency",
  "detune",
  "Q",
  "gain",
];
