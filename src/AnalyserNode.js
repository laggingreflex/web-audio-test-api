import utils from "./utils";
import Configuration from "./utils/Configuration";
import AudioNode from "./AudioNode";
import enumerate from "./decorators/enumerate";
import readonly from "./decorators/readonly";
import typedvalue from "./decorators/typedvalue";

let configuration = Configuration.getInstance();

export default class AnalyserNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "AnalyserNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    this._.minDecibels = -100;
    this._.maxDecibels = 30;
    this._.smoothingTimeConstant = 0.8;
    this._.JSONKeys = AnalyserNode.$JSONKeys.slice();
  }

  @enumerate([ 32, 64, 128, 256, 512, 1024, 2048 ], 2048)
  fftSize() {}

  @readonly()
  frequencyBinCount() {
    return this.fftSize >> 1;
  }

  @typedvalue(-100, utils.isNumber, "number")
  minDecibels() {}

  @typedvalue(30, utils.isNumber, "number")
  maxDecibels() {}

  @typedvalue(0.8, utils.isNumber, "number")
  smoothingTimeConstant() {}

  getFloatFrequencyData(array) {
    this._.inspector.describe("getFloatFrequencyData", ($assert) => {
      $assert(utils.isInstanceOf(array, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Float32Array")}
        `);
      });
    });
  }

  getByteFrequencyData(array) {
    this._.inspector.describe("getByteFrequencyData", ($assert) => {
      $assert(utils.isInstanceOf(array, Uint8Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Uint8Array")}
        `);
      });
    });
  }

  getFloatTimeDomainData(array) {
    this._.inspector.describe("getFloatTimeDomainData", ($assert) => {
      $assert(configuration.getState("AnalyserNode#getFloatTimeDomainData") === "enabled", (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });
      $assert(utils.isInstanceOf(array, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Float32Array")}
        `);
      });
    });
  }

  getByteTimeDomainData(array) {
    this._.inspector.describe("getByteTimeDomainData", ($assert) => {
      $assert(utils.isInstanceOf(array, Uint8Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Uint8Array")}
        `);
      });
    });
  }
}

AnalyserNode.$JSONKeys = [
  "fftSize",
  "minDecibels",
  "maxDecibels",
  "smoothingTimeConstant",
];
