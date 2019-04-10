import React from 'react';
import { observable, computed, extendObservable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius = 25;
  // The following is the same as above
  // constructor() {
  //   extendObservable(this, {
  //     unit: 'C',
  //     temperatureCelsius: 25
  //   })
  // }
  // Computed values are calculated when mobx thinks it is best to do so (internal map of previous values)
  @computed get temperatureKelvin() {
    return this.temperatureCelsius * (9/5) + 32;
  }
  @computed get temperatureFahrenheit() {
    return this.temperatureCelsius + 273.15;
  }
  @computed get temperature() {
    switch (this.unit) {
      case "C":
        return this.temperatureCelsius+"C";
      case "K":
        return this.temperatureKelvin+"K";
      default:
        return this.temperatureFahrenheit+"F";
    }
  }
}
// This is the same as above without classes
// const t = observable({
//   unit: 'C',
//   temperatureCelsius: 25,
//   temperatureKelvin: function() {
//     return this.temperatureCelsius * (9/5) + 32;
//   },
//   temperatureFahrenheit: function() {
//     return this.temperatureCelsius + 273.15;
//   },
//   temperature: function() {
//     switch (this.unit) {
//       case "C":
//         return this.temperatureCelsius+"C";
//       case "K":
//         return this.temperatureKelvin+"K";
//       default:
//         return this.temperatureFahrenheit+"F";
//     }
//   }
// })

const Temp = observer(({ temperature }: { temperature: Temperature }) => (
  <div>
    {temperature.temperature}
    <DevTools/>
  </div>
));

const t = new Temperature();

export default () => <Temp temperature={t} />