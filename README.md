# hats
home assistant typescript



### example

```ts
// myServer.ts
import { hats } from 'hats'
import { patioLights } from './plugins/patioLights'

hats([
  patioLights,
], {
  WEB: { // EXPRESS?
    PORT: 80
  }
})
```

```ts
// plugins/patioLights.ts
export const patioLightsTopics = {
  patio: { lights: { on: 'patio.lights.on' } }
}

export const patioLights: PluginFn = ({pub, sub}) => {
  sub('mqtt.in.patio_motion', evt => {
    pub('mqtt.out.wtfisthis', msg()) // hmmmm
  })
  // or a hear and a send.* typed and structured
  hear('mqtt.in.patio_motion', evt => {
    send.mqtt.out.patio_lights({power: 'on', brightness: 100})
  })
  // or BOTH
  hear.mqtt.in.patio_motion(evt => {
    send.mqtt.out.patio_lights({power: 'on', brightness: 100})
  })
  // amenable to fp???
  hear.mqtt.in.patio_motion(pipe(
    ({}) => ({ power: 'on', brightness: 100 }),
    send.mqtt.out.patio_lights
  ))
    
}
```

```ts
// hats types
export type PluginArgs = {
  // maybe want some kind of bespoke handlers instead of raw pubsub fns?
  // less trying to figure out wtf you can call?
  // but a lot of it will be knowing event names, look at nodered
  // there are only a few 
  pub: () => {}
  sub: () => Handle

  // do i care?  setInterval and setTimeout should work
  // interval: () => {}
  // timeout: () => {}
}

export type PluginFn = (args: PluginArgs) => void
```