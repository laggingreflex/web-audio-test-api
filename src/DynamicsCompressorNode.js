import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

let immigration = Immigration.getInstance();

export default class DynamicsCompressorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "DynamicsCompressorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    this._.JSONKeys = DynamicsCompressorNode.$JSONKeys.slice();
  }

  @props.audioparam(-24)
  threshold() {}

  @props.audioparam(30)
  knee() {}

  @props.audioparam(12)
  ratio() {}

  @props.audioparam(0)
  reduction() {}

  @props.audioparam(0.003)
  attack() {}

  @props.audioparam(0.25)
  release() {}
}

DynamicsCompressorNode.$JSONKeys = [
  "threshold",
  "knee",
  "ratio",
  "reduction",
  "attack",
  "release",
];
